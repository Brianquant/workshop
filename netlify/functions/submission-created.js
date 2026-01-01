const sgMail = require('@sendgrid/mail');

// SendGrid Setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email Templates (embedded)
const TEMPLATES = {
  de: `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deine Anmeldung für POTLUCK</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎉 Anmeldung bestätigt!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Hallo <strong>{{{name}}}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                vielen Dank für deine Anmeldung zu <strong>POTLUCK: Bring & Share</strong>! 🥘
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Wir freuen uns sehr, dass du dabei bist! Hier sind die wichtigsten Details:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f8f9fa; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      📅 Event-Details
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                      <strong>Datum:</strong> [Datum des Events hier einfügen]
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                      <strong>Uhrzeit:</strong> [Uhrzeit hier einfügen]
                    </p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333333;">
                      <strong>Ort:</strong> [Adresse hier einfügen]
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                <strong>Was mitbringen?</strong><br>
                Bringe ein Gericht deiner Wahl mit, das für mehrere Personen reicht. Egal ob herzhaft oder süß, selbstgekocht oder gekauft – Hauptsache lecker! 😋
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                <strong>Wichtig:</strong><br>
                Falls du Allergien oder spezielle Ernährungswünsche hast, haben wir diese in deiner Anmeldung vermerkt. Bitte denk auch daran, dein Gericht entsprechend zu kennzeichnen!
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Bei Fragen oder falls du deine Teilnahme absagen musst, melde dich einfach per Email.
              </p>
              <p style="margin: 30px 0 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Wir freuen uns auf einen tollen Abend mit dir! 🎊
              </p>
              <p style="margin: 10px 0 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Viele Grüße,<br>
                <strong>Dein POTLUCK Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #999999;">
                Diese Email wurde automatisch versendet. Bitte nicht auf diese Email antworten.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,

  en: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your POTLUCK Registration</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 30px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🎉 Registration Confirmed!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Hello <strong>{{{name}}}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Thank you for registering for <strong>POTLUCK: Bring & Share</strong>! 🥘
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                We're so excited to have you join us! Here are the most important details:
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f8f9fa; border-radius: 6px; padding: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      📅 Event Details
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                      <strong>Date:</strong> [Insert event date here]
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                      <strong>Time:</strong> [Insert time here]
                    </p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333333;">
                      <strong>Location:</strong> [Insert address here]
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                <strong>What to bring?</strong><br>
                Bring a dish of your choice that serves multiple people. Whether savory or sweet, homemade or store-bought – as long as it's delicious! 😋
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                <strong>Important:</strong><br>
                If you have any allergies or special dietary requirements, we've noted them in your registration. Please also remember to label your dish accordingly!
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                If you have any questions or need to cancel your participation, simply reach out via email.
              </p>
              <p style="margin: 30px 0 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                We're looking forward to a wonderful evening with you! 🎊
              </p>
              <p style="margin: 10px 0 0 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Best regards,<br>
                <strong>Your POTLUCK Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #999999;">
                This email was sent automatically. Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
};

/**
 * Get email template and replace variables
 */
function getEmailTemplate(language, variables) {
  let template = TEMPLATES[language];

  // Replace variables: {{{name}}} -> actual name
  Object.keys(variables).forEach(key => {
    const placeholder = `{{{${key}}}}`;
    template = template.replace(new RegExp(placeholder, 'g'), variables[key]);
  });

  return template;
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

    // Validate form name
    if (!formName || (!formName.includes('de') && !formName.includes('en'))) {
      console.error('Invalid or missing form name:', formName);
      throw new Error('Invalid form name');
    }

    const language = formName.includes('de') ? 'de' : 'en';

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
      subject: subject,
      html: htmlContent
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