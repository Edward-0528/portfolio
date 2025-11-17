# Core Plus Support Page Setup

## Overview
This portfolio website now includes a support page for the Core Plus app, accessible at:
**https://edwardgranados.me/coreplus**

This page meets Apple's App Store requirements for providing app support information.

## What Was Added

### 1. Core Plus Support Component
- **Location**: `src/components/CorePlusSupport.js`
- **Features**:
  - App description and key features
  - Support contact information
  - FAQ section
  - Privacy Policy
  - Terms of Service
  - Professional, mobile-responsive design

### 2. React Router
- Installed `react-router-dom` for client-side routing
- Updated `App.js` to support multiple routes:
  - `/` - Your main portfolio
  - `/coreplus` - Core Plus support page

### 3. Netlify Configuration
- Created `netlify.toml` for proper SPA routing
- Ensures `/coreplus` route works correctly when accessed directly
- Added security headers

## Deployment

### To Deploy to Netlify:

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Add Core Plus support page"
   git push origin master
   ```

2. **Netlify will automatically deploy** (if auto-deploy is enabled)
   - Or manually trigger a deploy in your Netlify dashboard

3. **Verify the deployment:**
   - Visit: https://edwardgranados.me/coreplus
   - Ensure all sections display correctly
   - Test on mobile devices

## For Apple App Store Submission

When submitting Core Plus to the App Store, use this URL for the support field:
```
https://edwardgranados.me/coreplus
```

The page includes:
- ✅ App description
- ✅ Contact information (support@edwardgranados.me)
- ✅ FAQ section
- ✅ Privacy Policy
- ✅ Terms of Service

## Customization

### Update Contact Email
If you want to use a different email, update it in:
- `src/components/CorePlusSupport.js`

Search for `support@edwardgranados.me` and replace with your preferred email.

### Modify Content
Edit `src/components/CorePlusSupport.js` to update:
- App description
- FAQ answers
- Privacy policy details
- Terms of service

### Styling
The page uses Tailwind CSS classes. You can modify colors, spacing, and layout by editing the className attributes in the component.

## Local Testing

To test locally before deploying:

```bash
# Start the development server
npm start

# Visit in your browser
http://localhost:3000/coreplus
```

## Troubleshooting

### Route not working on Netlify
- Ensure `netlify.toml` is in the root directory
- Check that the redirect rules are properly configured

### Build fails
- Run `npm install` to ensure all dependencies are installed
- Check for any syntax errors in the code

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` for correct content paths

## Support

If you need to make changes or have questions, refer to:
- React Router docs: https://reactrouter.com/
- Netlify docs: https://docs.netlify.com/
- Tailwind CSS docs: https://tailwindcss.com/

---

**Next Steps:**
1. Deploy to Netlify
2. Test the live URL: https://edwardgranados.me/coreplus
3. Use this URL in your Apple App Store submission
