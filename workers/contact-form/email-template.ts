/**
 * Email templates for contact form submissions
 * Professional HTML email design matching Miami Nights theme
 */

import type { ContactFormData } from './validator';

/**
 * Format date to readable string
 */
function formatDate(date: Date): string {
  return date.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/New_York',
  });
}

/**
 * Get service display name
 */
function getServiceDisplayName(service: string): string {
  const serviceNames: Record<string, string> = {
    'local-seo': 'Local SEO',
    'ecommerce-seo': 'E-commerce SEO',
    'technical-seo': 'Technical SEO',
    'content-strategy': 'Content Strategy',
    'gmb-optimization': 'Google Business Profile Optimization',
    'link-building': 'Link Building',
    'full-service': 'Full-Service SEO',
  };
  
  return serviceNames[service] || service;
}

/**
 * Get budget display name
 */
function getBudgetDisplayName(budget: string): string {
  const budgetNames: Record<string, string> = {
    'under-1k': 'Under $1,000',
    '1k-5k': '$1,000 - $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-plus': '$10,000+',
  };
  
  return budgetNames[budget] || budget;
}

/**
 * Generate HTML email template
 */
export function generateHTMLEmail(
  formData: ContactFormData,
  metadata: {
    ip?: string;
    userAgent?: string;
    timestamp: Date;
  }
): string {
  const serviceName = getServiceDisplayName(formData.service);
  const budgetName = formData.budget ? getBudgetDisplayName(formData.budget) : 'Not specified';
  const formattedDate = formatDate(metadata.timestamp);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead from SEO Services Miami</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .header p {
      margin: 8px 0 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
    .field:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .field-label {
      font-weight: 600;
      color: #667eea;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .field-value {
      font-size: 16px;
      color: #333;
      word-wrap: break-word;
    }
    .message-box {
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      margin-top: 8px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 20px;
      text-align: center;
    }
    .metadata {
      background: #f8f9fa;
      padding: 20px;
      margin-top: 20px;
      border-top: 2px solid #e5e5e5;
      font-size: 12px;
      color: #666;
    }
    .metadata-item {
      margin-bottom: 8px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background: #f8f9fa;
      color: #666;
      font-size: 12px;
    }
    .highlight {
      background: #fff3cd;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🚀 New Lead Alert!</h1>
      <p>SEO Services Miami - Contact Form Submission</p>
    </div>

    <!-- Main Content -->
    <div class="content">
      <p style="font-size: 16px; color: #666; margin-bottom: 24px;">
        You have received a new inquiry from <strong>${formData.name}</strong> interested in 
        <span class="highlight">${serviceName}</span>
      </p>

      <!-- Contact Information -->
      <div class="field">
        <div class="field-label">👤 Name</div>
        <div class="field-value">${formData.name}</div>
      </div>

      <div class="field">
        <div class="field-label">📧 Email</div>
        <div class="field-value">
          <a href="mailto:${formData.email}" style="color: #667eea; text-decoration: none;">
            ${formData.email}
          </a>
        </div>
      </div>

      ${formData.phone ? `
      <div class="field">
        <div class="field-label">📱 Phone</div>
        <div class="field-value">
          <a href="tel:${formData.phone}" style="color: #667eea; text-decoration: none;">
            ${formData.phone}
          </a>
        </div>
      </div>
      ` : ''}

      ${formData.website ? `
      <div class="field">
        <div class="field-label">🌐 Website</div>
        <div class="field-value">
          <a href="${formData.website}" target="_blank" style="color: #667eea; text-decoration: none;">
            ${formData.website}
          </a>
        </div>
      </div>
      ` : ''}

      <!-- Service & Budget -->
      <div class="field">
        <div class="field-label">🎯 Service Interest</div>
        <div class="field-value">${serviceName}</div>
      </div>

      <div class="field">
        <div class="field-label">💰 Monthly Budget</div>
        <div class="field-value">${budgetName}</div>
      </div>

      <!-- Message -->
      <div class="field">
        <div class="field-label">💬 Message</div>
        <div class="message-box">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin-top: 32px;">
        <a href="mailto:${formData.email}?subject=Re: SEO Services Inquiry" class="cta-button">
          Reply to ${formData.name}
        </a>
      </div>

      <!-- Metadata -->
      <div class="metadata">
        <div style="font-weight: 600; margin-bottom: 12px; color: #333;">📊 Submission Details</div>
        <div class="metadata-item">
          <strong>Timestamp:</strong> ${formattedDate}
        </div>
        ${metadata.ip ? `
        <div class="metadata-item">
          <strong>IP Address:</strong> ${metadata.ip}
        </div>
        ` : ''}
        ${metadata.userAgent ? `
        <div class="metadata-item">
          <strong>User Agent:</strong> ${metadata.userAgent}
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0;">
        This email was automatically generated by the SEO Services Miami contact form.
      </p>
      <p style="margin: 8px 0 0; font-size: 11px; color: #999;">
        © ${new Date().getFullYear()} SEO Services Miami. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email (fallback)
 */
export function generatePlainTextEmail(
  formData: ContactFormData,
  metadata: {
    ip?: string;
    userAgent?: string;
    timestamp: Date;
  }
): string {
  const serviceName = getServiceDisplayName(formData.service);
  const budgetName = formData.budget ? getBudgetDisplayName(formData.budget) : 'Not specified';
  const formattedDate = formatDate(metadata.timestamp);

  return `
NEW LEAD FROM SEO SERVICES MIAMI
================================

Contact Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.website ? `Website: ${formData.website}` : ''}

Service Details:
---------------
Service Interest: ${serviceName}
Monthly Budget: ${budgetName}

Message:
--------
${formData.message}

Submission Details:
------------------
Timestamp: ${formattedDate}
${metadata.ip ? `IP Address: ${metadata.ip}` : ''}
${metadata.userAgent ? `User Agent: ${metadata.userAgent}` : ''}

---
Reply directly to: ${formData.email}
  `.trim();
}

/**
 * Generate email subject line
 */
export function generateEmailSubject(formData: ContactFormData): string {
  const serviceName = getServiceDisplayName(formData.service);
  return `New Lead: ${formData.name} - ${serviceName} - SEO Services Miami`;
}
