const { getStore } = require("@netlify/blobs");
const sgMail = require('@sendgrid/mail');

// SendGrid Setup
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Diese Function wird AUTOMATISCH von Netlify getriggert
 * bei jedem Form-Submit (wegen des Dateinamens "submission-created")
 */
exports.handler = async (event, context) => {
  console.log('=== Form Submission Received ===');
  
  try {
    // 1. Parse Form Data
    const { payload } = JSON.parse(event.body);
    const formData = payload.data;
    
    const name = formData['full-name'];
    const email = formData.email;
    const age = formData.age;
    const allergies = formData.allergies || 'Keine angegeben';
    const formName = formData['form-name']; // interest-form-de oder interest-form-en
    const language = formName.includes('de') ? 'de' : 'en';
    
    console.log(`📝 Submission from: ${name} (${email}) - Language: ${language}`);
    
    // 2. Get Counter from Netlify Blobs
    const store = getStore("potluck-submissions");
    let count = parseInt(await store.get("total-count") || "0");
    count++;
    
    console.log(`📊 Total submissions now: ${count}`);
    
    // 3. Save updated counter
    await store.set("total-count", count.toString());
    
    // 4. Save submission data (für Backup/Referenz)
    const submissionData = {
      count,
      name,
      email,
      age,
      allergies,
      language,
      timestamp: new Date().toISOString(),
      batch: count <= 12 ? 1 : Math.ceil((count - 12) / 12) + 1
    };
    
    await store.set(`submission-${count}`, JSON.stringify(submissionData));
    console.log(`💾 Saved submission data for #${count}`);
    
    // 5. Determine which email template to send
    const isFirstBatch = count <= 12;
    const templateId = getTemplateId(language, isFirstBatch);
    const whatsappLink = isFirstBatch 
      ? process.env.WHATSAPP_EVENT_LINK 
      : process.env.WHATSAPP_NEWS_LINK;
    
    console.log(`📧 Sending ${isFirstBatch ? 'FIRST EVENT' : 'NEXT EVENT'} template (${language})`);
    console.log(`   Template ID: ${templateId}`);
    
    // 6. Send Email via SendGrid
    const msg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      templateId: templateId,
      dynamicTemplateData: {
        name: name,
        whatsapp_link: isFirstBatch ? whatsappLink : null,
        whatsapp_news_link: !isFirstBatch ? whatsappLink : null
      }
    };
    
    await sgMail.send(msg);
    console.log(`✅ Email sent successfully to ${email}`);
    
    // 7. Return success
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        submissionNumber: count,
        batch: isFirstBatch ? 1 : Math.ceil((count - 12) / 12) + 1,
        templateUsed: templateId
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

/**
 * Get correct SendGrid Template ID based on language and batch
 */
function getTemplateId(language, isFirstBatch) {
  if (language === 'de') {
    return isFirstBatch 
      ? process.env.SENDGRID_TEMPLATE_FIRST_DE 
      : process.env.SENDGRID_TEMPLATE_NEXT_DE;
  } else {
    return isFirstBatch 
      ? process.env.SENDGRID_TEMPLATE_FIRST_EN 
      : process.env.SENDGRID_TEMPLATE_NEXT_EN;
  }
}