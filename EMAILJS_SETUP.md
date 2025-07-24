# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select "Gmail"
   - **Outlook**: Select "Outlook"
   - **Other**: Select your provider
4. Follow the setup instructions for your email provider
5. **Important**: Copy your **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: Portfolio Contact Form - {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent through your portfolio contact form.
```

4. **Important**: Copy your **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Update Your Contact Component

Replace these values in your `Contact.js` file:

```javascript
const serviceID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID  
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

## Step 6: Test Your Form

1. Start your development server: `npm start`
2. Navigate to your contact form
3. Fill out and submit a test message
4. Check your email inbox for the message

## EmailJS Template Variables

Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_email}}` - Your email (optional, can be hardcoded)

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**
   - Check your Public Key is correct
   - Ensure your domain is allowed in EmailJS settings

2. **Template not found**
   - Verify your Template ID is correct
   - Make sure template is active

3. **Service not found**
   - Check your Service ID is correct
   - Ensure service is properly configured

4. **Emails not received**
   - Check spam folder
   - Verify email service configuration
   - Test with a different email template

### Security Notes:

- Public Key is safe to expose in frontend code
- Service ID and Template ID are also safe to expose
- Your actual email credentials are never exposed
- EmailJS handles all email sending securely

## Free Plan Limits:

- 200 emails per month
- Perfect for portfolio contact forms
- Upgrade available for higher volume

## Alternative: Environment Variables (Optional)

For better organization, you can use environment variables:

1. Create `.env` file in your project root:
```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Update Contact.js:
```javascript
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
```

3. Add `.env` to your `.gitignore` file

## That's it!

Once you complete these steps, your contact form will be fully functional and will send emails directly to your inbox! 🎉
