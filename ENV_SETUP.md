# Environment Variables Configuration

## Overview
This project uses environment variables to manage sensitive credentials and contact information. All credentials are kept in `.env` file (which is ignored by git) and dummy values are displayed in the HTML.

## Setup Instructions

### 1. Copy `.env.example` to `.env`
```bash
cp .env.example .env
```

### 2. Update `.env` with Your Real Values
Edit the `.env` file and replace dummy values with actual credentials:

```env
# Google Analytics & Tracking
PUBLIC_GA_ID=G-YOUR_ACTUAL_ID
PUBLIC_GTM_ID=GTM-YOUR_ACTUAL_ID

# Contact Information
PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxx
PUBLIC_COMPANY_EMAIL=your-email@company.com

# Office Addresses
PUBLIC_OFFICE_ADDRESS_1=Your actual address 1
PUBLIC_OFFICE_ADDRESS_2=Your actual address 2

# Social Media Links
PUBLIC_INSTAGRAM_URL=https://instagram.com/yourprofile
PUBLIC_TIKTOK_URL=https://tiktok.com/@yourprofile
PUBLIC_YOUTUBE_URL=https://youtube.com/@yourprofile
PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yourcompany

# Company Information
PUBLIC_COMPANY_NAME=Your Actual Company Name
```

### 3. Build and Deploy
```bash
npm run build
```

The environment variables will be injected at build time and embedded in the HTML files.

## How It Works

### Public Environment Variables (Exposed to Client)
All variables prefixed with `PUBLIC_` are automatically available on the client-side through `import.meta.env` in Astro components:

```astro
---
const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '62812345678';
const gaId = import.meta.env.PUBLIC_GA_ID || 'G-DUMMY000000';
---

<a href={`https://wa.me/${whatsappNumber}`}>
  Contact via WhatsApp
</a>
```

### Files Using Environment Variables

#### Credentials & Tracking:
- **src/layouts/Layout.astro** - Google Analytics ID and GTM ID
- **src/components/ContactSection.astro** - WhatsApp number, email, social media
- **src/components/Footer.astro** - Address and social media links
- **src/components/Header.astro** - WhatsApp contact button
- **src/components/Hero.astro** - WhatsApp CTA
- **src/components/ProfileSection.astro** - WhatsApp CTA

#### Dynamic Pages:
- **src/pages/services/[slug].astro** - WhatsApp links per service
- **src/pages/artikel/[slug].astro** - WhatsApp links in articles
- **src/pages/[slug].astro** - WhatsApp links per region

## Dummy Values in Development

When `.env` variables are not set or during development, the following dummy values are displayed:

| Variable | Dummy Value |
|----------|------------|
| `PUBLIC_GA_ID` | `G-DUMMY000000` |
| `PUBLIC_GTM_ID` | `GTM-DUMMY0000` |
| `PUBLIC_WHATSAPP_NUMBER` | `62812345678` |
| `PUBLIC_COMPANY_EMAIL` | `info@example.com` |
| Address fields | `Dummy Street` addresses |
| Social media URLs | Generic domain URLs |

## Build-Time Injection

Since Astro statically generates HTML at build time:

1. **Development**: Changes to `.env` require restarting `npm run dev`
2. **Production**: The `.env` file must be present when running `npm run build`
3. **No Runtime Updates**: Values are compiled into HTML - you cannot change them after build

## Security Best Practices

✅ **Do:**
- Add `.env` to `.gitignore` (already configured)
- Keep sensitive credentials in `.env` only
- Use `.env.example` for version control (showing structure, no secrets)
- Rotate credentials regularly
- Use different credentials for dev/staging/production

❌ **Don't:**
- Commit `.env` file to repository
- Expose real phone numbers or addresses in source code
- Share `.env` files via email or chat
- Use production credentials in development

## Deployment Checklist

1. ✅ `.env` file is in `.gitignore`
2. ✅ `.env.example` is in repository (for reference)
3. ✅ On server/deployment, create `.env` with production values
4. ✅ Run `npm run build` to compile with actual values
5. ✅ Deploy the generated `dist/` directory

## Troubleshooting

### Issue: Dummy values showing after build
**Solution:** Ensure `.env` file exists and is readable before running `npm run build`

### Issue: Old values showing after updating `.env`
**Solution:** Clear the `dist/` folder and rebuild:
```bash
rm -rf dist/ && npm run build
```

### Issue: Build fails with missing variables
**Solution:** Check that all `PUBLIC_*` variables have fallback values in code or are defined in `.env`

## References

- [Astro Environment Variables Documentation](https://docs.astro.build/en/guides/environment-variables/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
