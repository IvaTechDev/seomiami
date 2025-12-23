# Cloudflare Workers - SEO Services Miami

This directory contains Cloudflare Workers for serverless backend functionality.

## Overview

The backend is built using Cloudflare Workers for edge-computing benefits:
- ⚡ Fast global response times
- 🔒 Built-in DDoS protection
- 💰 Cost-effective serverless architecture
- 🌍 Deployed to 300+ edge locations worldwide

## Directory Structure

```
workers/
├── contact-form/         # Contact form handler
│   ├── index.ts         # Main worker entry point
│   ├── errors.ts        # Error handling utilities
│   ├── validator.ts     # Input validation & sanitization
│   └── email-template.ts # Email templates
├── rate-limiter/        # Rate limiting utility
│   └── index.ts         # IP-based rate limiting
└── README.md           # This file
```

## Prerequisites

1. **Node.js** (v18 or later)
2. **Wrangler CLI** - Cloudflare Workers CLI tool
3. **Cloudflare Account** - Free tier is sufficient
4. **Resend Account** - For email delivery (free tier available)

### Install Wrangler globally:
```bash
npm install -g wrangler
```

### Login to Cloudflare:
```bash
wrangler login
```

## Setup Instructions

### 1. Configure Environment Variables

Copy the Wrangler configuration:
```bash
cp wrangler.toml wrangler.toml.local
```

Edit `wrangler.toml` and add your Cloudflare account ID:
```toml
account_id = "your-cloudflare-account-id"
```

### 2. Set Secrets

Set the Resend API key (required for email delivery):
```bash
wrangler secret put RESEND_API_KEY
# When prompted, enter your Resend API key
```

### 3. Configure Variables

Update the variables in `wrangler.toml`:
- `FORM_SUBMISSION_EMAIL` - Email address to receive form submissions
- `ALLOWED_ORIGIN` - Your production domain for CORS
- `RATE_LIMIT_MAX` - Maximum requests per window (default: 5)
- `RATE_LIMIT_WINDOW` - Time window in seconds (default: 3600)

## Development

### Run locally:
```bash
wrangler dev
```

This starts a local development server at `http://localhost:8787`

### Test the contact form endpoint:
```bash
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "local-seo",
    "message": "Test message"
  }'
```

## Deployment

### Deploy to production:
```bash
wrangler deploy
```

### Deploy to specific environment:
```bash
# Development
wrangler deploy --env development

# Production
wrangler deploy --env production
```

### View deployment info:
```bash
wrangler deployments list
```

## Features

### 📧 Contact Form Handler

**Location:** `workers/contact-form/index.ts`

**Features:**
- ✅ Request validation and sanitization
- ✅ Email format validation
- ✅ Phone number validation (US format)
- ✅ Honeypot spam protection
- ✅ Rate limiting (5 requests per hour per IP)
- ✅ CORS handling
- ✅ Professional HTML email templates
- ✅ Integration with Resend API
- ✅ Error handling with user-friendly messages

**Endpoints:**
- `POST /api/contact` - Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(305) 555-0123",
  "website": "https://example.com",
  "service": "local-seo",
  "budget": "1k-5k",
  "message": "I need SEO services",
  "honeypot": ""
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your inquiry! We will get back to you within 24 hours."
}
```

**Error Response (4xx/5xx):**
```json
{
  "success": false,
  "error": {
    "message": "Please enter a valid email address",
    "code": "VALIDATION_ERROR",
    "field": "email"
  }
}
```

### 🚦 Rate Limiter

**Location:** `workers/rate-limiter/index.ts`

**Features:**
- IP-based rate limiting
- Configurable limits and time windows
- In-memory storage (fallback)
- KV storage support (recommended for production)
- Automatic cleanup of expired entries

**Configuration:**
```typescript
{
  maxRequests: 5,      // Max requests per window
  windowSeconds: 3600  // Time window (1 hour)
}
```

### 📝 Validation

**Location:** `workers/contact-form/validator.ts`

**Features:**
- Email validation (RFC 5322 compatible)
- Phone validation (US format)
- URL validation
- Input sanitization (XSS prevention)
- Field length limits
- Service/budget selection validation

### 📧 Email Templates

**Location:** `workers/contact-form/email-template.ts`

**Features:**
- Professional HTML design
- Miami Nights theme matching
- Responsive email design
- Plain text fallback
- Metadata included (IP, timestamp, user agent)

## Monitoring & Debugging

### View logs:
```bash
wrangler tail
```

### View logs in production:
```bash
wrangler tail --env production
```

### Check worker metrics:
Visit Cloudflare Dashboard → Workers & Pages → Your Worker → Metrics

## Security Features

- ✅ **CORS Protection** - Only allowed origins can make requests
- ✅ **Rate Limiting** - Prevents spam and DoS attacks
- ✅ **Input Validation** - All inputs are validated and sanitized
- ✅ **Honeypot Field** - Bot detection
- ✅ **HTTPS Only** - All requests are encrypted
- ✅ **XSS Prevention** - HTML/script injection blocked
- ✅ **Secret Management** - API keys stored securely

## Troubleshooting

### Issue: "Unauthorized" error
**Solution:** Check that `RESEND_API_KEY` secret is set correctly:
```bash
wrangler secret put RESEND_API_KEY
```

### Issue: CORS errors in browser
**Solution:** 
1. Check `ALLOWED_ORIGIN` in `wrangler.toml`
2. Ensure it matches your frontend domain exactly
3. For development, use `http://localhost:4321`

### Issue: Rate limit errors
**Solution:** 
- Wait for rate limit window to expire (default 1 hour)
- Or adjust limits in `wrangler.toml`
- Or reset rate limit in development: `wrangler kv:key delete "rate_limit:YOUR_IP"`

### Issue: Email not sending
**Solution:**
1. Verify Resend API key is valid
2. Check Resend dashboard for delivery status
3. Verify domain is verified in Resend (for production)
4. Check worker logs: `wrangler tail`

### Issue: TypeScript errors
**Solution:** Install Cloudflare Workers types:
```bash
npm install -D @cloudflare/workers-types
```

## Production Checklist

Before deploying to production:

- [ ] Update `account_id` in `wrangler.toml`
- [ ] Set production `RESEND_API_KEY` secret
- [ ] Configure production routes in `wrangler.toml`
- [ ] Set `FORM_SUBMISSION_EMAIL` to production email
- [ ] Set `ALLOWED_ORIGIN` to production domain
- [ ] Verify domain in Resend dashboard
- [ ] Test form submission end-to-end
- [ ] Set up monitoring alerts in Cloudflare
- [ ] Configure KV namespace for rate limiting (optional)
- [ ] Review rate limit settings
- [ ] Test error handling scenarios

## Cost Estimation

Cloudflare Workers Free Tier:
- ✅ 100,000 requests per day
- ✅ 10ms CPU time per request

For a typical contact form:
- ~2-3ms processing per request
- ~30-50 submissions per day expected
- **Cost: $0/month** (well within free tier)

Resend Free Tier:
- ✅ 100 emails per day
- ✅ 3,000 emails per month

**Total estimated cost: $0/month**

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Resend API Docs](https://resend.com/docs)
- [Workers KV Docs](https://developers.cloudflare.com/kv/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Cloudflare Workers logs: `wrangler tail`
3. Check Resend dashboard for email delivery status
4. Review the project's GitHub issues

---

**Phase 7 Implementation Complete** ✅
