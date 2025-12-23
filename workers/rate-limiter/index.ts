/**
 * Rate limiter utility for IP-based request throttling
 * Uses in-memory storage (can be upgraded to KV for production)
 */

import type { RateLimitError } from '../contact-form/errors';
import { RateLimitError as RateLimitErrorClass } from '../contact-form/errors';

// Cloudflare KV type (for when @cloudflare/workers-types is not available)
type KVNamespace = any;

export interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
}

export interface RateLimitData {
  count: number;
  resetTime: number;
}

/**
 * Simple in-memory rate limiter
 * Note: In production, use Cloudflare KV for distributed rate limiting
 */
class InMemoryRateLimiter {
  private storage: Map<string, RateLimitData>;
  
  constructor() {
    this.storage = new Map();
  }
  
  /**
   * Check if request should be rate limited
   * @returns true if allowed, false if rate limit exceeded
   */
  async checkRateLimit(
    key: string,
    config: RateLimitConfig
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const data = this.storage.get(key);
    
    // No previous requests or window expired
    if (!data || now > data.resetTime) {
      const resetTime = now + (config.windowSeconds * 1000);
      this.storage.set(key, { count: 1, resetTime });
      
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime,
      };
    }
    
    // Within rate limit window
    if (data.count < config.maxRequests) {
      data.count++;
      this.storage.set(key, data);
      
      return {
        allowed: true,
        remaining: config.maxRequests - data.count,
        resetTime: data.resetTime,
      };
    }
    
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: data.resetTime,
    };
  }
  
  /**
   * Clean up expired entries (optional maintenance)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, data] of this.storage.entries()) {
      if (now > data.resetTime) {
        this.storage.delete(key);
      }
    }
  }
  
  /**
   * Reset rate limit for a specific key (for testing)
   */
  reset(key: string): void {
    this.storage.delete(key);
  }
  
  /**
   * Get current stats for a key
   */
  getStats(key: string): RateLimitData | null {
    return this.storage.get(key) || null;
  }
}

/**
 * KV-based rate limiter (for production with Cloudflare KV)
 */
class KVRateLimiter {
  private kv: KVNamespace;
  
  constructor(kv: KVNamespace) {
    this.kv = kv;
  }
  
  /**
   * Check if request should be rate limited using KV
   */
  async checkRateLimit(
    key: string,
    config: RateLimitConfig
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const now = Date.now();
    const kvKey = `rate_limit:${key}`;
    
    // Get existing data from KV
    const dataStr = await this.kv.get(kvKey);
    const data: RateLimitData | null = dataStr ? JSON.parse(dataStr) : null;
    
    // No previous requests or window expired
    if (!data || now > data.resetTime) {
      const resetTime = now + (config.windowSeconds * 1000);
      const newData: RateLimitData = { count: 1, resetTime };
      
      // Store in KV with expiration
      await this.kv.put(kvKey, JSON.stringify(newData), {
        expirationTtl: config.windowSeconds,
      });
      
      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime,
      };
    }
    
    // Within rate limit window
    if (data.count < config.maxRequests) {
      data.count++;
      
      // Calculate TTL for KV (seconds until reset)
      const ttl = Math.ceil((data.resetTime - now) / 1000);
      await this.kv.put(kvKey, JSON.stringify(data), {
        expirationTtl: Math.max(ttl, 1),
      });
      
      return {
        allowed: true,
        remaining: config.maxRequests - data.count,
        resetTime: data.resetTime,
      };
    }
    
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: data.resetTime,
    };
  }
  
  /**
   * Reset rate limit for a specific key
   */
  async reset(key: string): Promise<void> {
    await this.kv.delete(`rate_limit:${key}`);
  }
}

// Singleton instance for in-memory rate limiting
const inMemoryLimiter = new InMemoryRateLimiter();

/**
 * Create rate limiter instance
 * Uses KV if available, otherwise falls back to in-memory
 */
export function createRateLimiter(kv?: KVNamespace) {
  if (kv) {
    return new KVRateLimiter(kv);
  }
  return inMemoryLimiter;
}

/**
 * Check rate limit and throw error if exceeded
 */
export async function enforceRateLimit(
  identifier: string,
  config: RateLimitConfig,
  kv?: KVNamespace
): Promise<{ remaining: number; resetTime: number }> {
  const limiter = createRateLimiter(kv);
  const result = await limiter.checkRateLimit(identifier, config);
  
  if (!result.allowed) {
    const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
    throw new RateLimitErrorClass(retryAfter);
  }
  
  return {
    remaining: result.remaining,
    resetTime: result.resetTime,
  };
}

/**
 * Get client IP from request
 * Cloudflare Workers provides this in request headers
 */
export function getClientIP(request: Request): string {
  // Cloudflare provides the client IP in this header
  const cfConnectingIP = request.headers.get('CF-Connecting-IP');
  if (cfConnectingIP) return cfConnectingIP;
  
  // Fallback to X-Forwarded-For
  const xForwardedFor = request.headers.get('X-Forwarded-For');
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs, get the first one
    return xForwardedFor.split(',')[0].trim();
  }
  
  // Final fallback (shouldn't happen in Cloudflare Workers)
  return 'unknown';
}

/**
 * Create rate limit key from IP address
 */
export function createRateLimitKey(ip: string): string {
  return `contact_form:${ip}`;
}
