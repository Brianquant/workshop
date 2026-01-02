const sgMail = require('@sendgrid/mail');

// SendGrid Setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email Templates (embedded)
const TEMPLATES = {
  de: `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anmeldung erhalten!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2B2D42; margin: 0; padding: 0; background-color: #FFFEF7; overflow-x: hidden;">
  
  <div style="width: 100%; background-color: #FFFEF7; padding: 20px 10px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #EF476F; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">Anmeldung erhalten!</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px 20px;">
        <h2 style="color: #EF476F; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Hey {{name}}!</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Danke für deine Anmeldung zum Potluck! 🍜</p>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Wir bearbeiten gerade deine Anfrage und melden uns in den <strong>nächsten Tagen</strong> mit allen Details bei dir.</p>
        
        <div style="background: linear-gradient(135deg, #FFF5E6 0%, #FFE6F0 100%); border-left: 5px solid #FFD166; padding: 20px; margin: 25px 0; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2B2D42;">📧 Finale Infos + WhatsApp-Gruppen-Link folgen bald!</p>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Bis dahin: Freu dich auf gutes Essen, tolle Gespräche und neue Bekanntschaften! 🎉</p>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Liebe Grüße,<br>
        <strong>Euer Host Brian</strong></p>
      </div>
      
      <!-- Footer -->
      <div style="background: #F5F5F5; padding: 20px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #E0E0E0;">
        <p style="margin: 5px 0; font-size: 14px;"><strong>VibeZone Event</strong></p>
        <p style="margin: 5px 0; font-size: 14px;">vibezone.space</p>
        <p style="margin: 5px 0; font-size: 14px;"><a href="mailto:operation@vibezone.space" style="color: #EF476F; text-decoration: none;">operation@vibezone.space</a></p>
      </div>
      
    </div>
  </div>
  
</body>
</html>`,

  en: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration received!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2B2D42; margin: 0; padding: 0; background-color: #FFFEF7; overflow-x: hidden;">
  
  <div style="width: 100%; background-color: #FFFEF7; padding: 20px 10px;">
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #EF476F; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">Registration received!</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px 20px;">
        <h2 style="color: #EF476F; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Hey {{name}}!</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Thanks for signing up for the potluck! 🍜</p>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">We're processing your registration and will get back to you in the <strong>next few days</strong> with all the details.</p>
        
        <div style="background: linear-gradient(135deg, #FFF5E6 0%, #FFE6F0 100%); border-left: 5px solid #FFD166; padding: 20px; margin: 25px 0; border-radius: 8px; text-align: center;">
          <p style="margin: 0; font-size: 16px; font-weight: 600; color: #2B2D42;">📧 Final info + WhatsApp group link coming soon!</p>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Until then: Get excited for great food, interesting conversations, and new connections! 🎉</p>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #2B2D42;">Best regards,<br>
        <strong>Your Host Brian</strong></p>
      </div>
      
      <!-- Footer -->
      <div style="background: #F5F5F5; padding: 20px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #E0E0E0;">
        <p style="margin: 5px 0; font-size: 14px;"><strong>VibeZone Event</strong></p>
        <p style="margin: 5px 0; font-size: 14px;">vibezone.space</p>
        <p style="margin: 5px 0; font-size: 14px;"><a href="mailto:operation@vibezone.space" style="color: #EF476F; text-decoration: none;">operation@vibezone.space</a></p>
      </div>
      
    </div>
  </div>
  
</body>
</html>`
};

/**
 * Get email template and replace variables
 */
function getEmailTemplate(language, variables) {
  let template = TEMPLATES[language];

  // Replace variables: {{name}} -> actual name
  Object.keys(variables).forEach(key => {
    const placeholder = `{{${key}}}`;
    template = template.replace(new RegExp(placeholder, 'g'), variables[key]);
  });

  return template;
}

/**
 * Generate plain text version of the email
 */
function generatePlainTextVersion(language, name) {
  if (language === 'de') {
    return `Anmeldung erhalten!

Hey ${name}!

Danke für deine Anmeldung zum Potluck! 🍜

Wir bearbeiten gerade deine Anfrage und melden uns in den nächsten Tagen mit allen Details bei dir.

📧 Finale Infos + WhatsApp-Gruppen-Link folgen bald!

Bis dahin: Freu dich auf gutes Essen, tolle Gespräche und neue Bekanntschaften! 🎉

Liebe Grüße,
Euer Host Brian

---
VibeZone Event
vibezone.space
operation@vibezone.space`;
  } else {
    return `Registration received!

Hey ${name}!

Thanks for signing up for the potluck! 🍜

We're processing your registration and will get back to you in the next few days with all the details.

📧 Final info + WhatsApp group link coming soon!

Until then: Get excited for great food, interesting conversations, and new connections! 🎉

Best regards,
Your Host Brian

---
VibeZone Event
vibezone.space
operation@vibezone.space`;
  }
}

/**
 * Diese Function wird AUTOMATISCH von Netlify getriggert
 * bei jedem Form-Submit (wegen des Dateinamens "submission-created")
 */
exports.handler = async function(event, context) {
  console.log('=== Form Submission Received ===');

  try {
    // 1. Parse Form Data
    const { payload } = JSON.parse(event.body);
    const formData = payload.data;

    // Debug logging
    console.log('Form Data:', JSON.stringify(formData, null, 2));

    const name = formData['full-name'];
    const email = formData.email;
    const formName = payload.form_name; // Netlify uses payload.form_name, not formData['form-name']

    console.log('Form name from payload:', formName);

    // Validate form name and detect language
    if (!formName || (!formName.endsWith('-de') && !formName.endsWith('-en'))) {
      console.error('Invalid or missing form name:', formName);
      throw new Error('Invalid form name');
    }

    const language = formName.endsWith('-de') ? 'de' : 'en';

    console.log(`📝 Submission from: ${name} (${email}) - Language: ${language}`);

    // 2. Load HTML template from file
    const htmlContent = getEmailTemplate(language, { name });

    // 3. Define subject based on language
    const subject = language === 'de'
      ? 'Deine Anmeldung für POTLUCK: Bring & Share'
      : 'Your Registration for POTLUCK: Bring & Share';

    console.log(`📧 Sending confirmation email (${language})`);

    // 4. Send Email via SendGrid (with HTML content, not templateId)
    const msg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      replyTo: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      subject: subject,
      html: htmlContent,
      text: generatePlainTextVersion(language, name), // Plain text fallback
      trackingSettings: {
        clickTracking: {
          enable: false
        },
        openTracking: {
          enable: false
        }
      },
      mailSettings: {
        bypassListManagement: {
          enable: false
        }
      },
      categories: ['potluck-confirmation']
    };

    await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${email}`);

    // 5. Return success
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        language: language
      })
    };

  } catch (error) {
    console.error('❌ Error processing submission:', error);

    // Detailed error logging
    if (error.response) {
      console.error('SendGrid Error Response:', error.response.body);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: error.response ? error.response.body : null
      })
    };
  }
};