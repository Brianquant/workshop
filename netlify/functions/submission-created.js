const sgMail = require('@sendgrid/mail');
const { readFileSync } = require('fs');
const { join } = require('path');

// SendGrid Setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Load and prepare email template
 */
function getEmailTemplate(language, variables) {
  // Use __dirname which is available in Netlify Functions
  const templatePath = join(__dirname, 'email-templates', `confirmation-${language}.html`);
  let template = readFileSync(templatePath, 'utf-8');

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