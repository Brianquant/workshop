const { getStore } = require("@netlify/blobs");

/**
 * Setzt den Submission-Counter auf 0 zurück
 * Aufruf: POST https://potluck-ms.vibezone.space/.netlify/functions/reset-count
 * 
 * WICHTIG: Aus Security-Gründen sollte diese Function nur temporär existieren
 * oder mit einem Secret-Key geschützt werden!
 */
exports.handler = async (event, context) => {
  
  // Optional: Security Check (empfohlen!)
  const adminSecret = process.env.ADMIN_SECRET; // z.B. in Netlify Env Vars setzen
  const providedSecret = event.headers['x-admin-secret'] || event.queryStringParameters?.secret;
  
  if (adminSecret && providedSecret !== adminSecret) {
    return {
      statusCode: 403,
      body: JSON.stringify({ 
        error: 'Unauthorized - Invalid admin secret' 
      })
    };
  }
  
  try {
    const store = getStore("potluck-submissions");
    
    // Get current count before reset (for confirmation)
    const oldCount = await store.get("total-count") || "0";
    
    // Reset counter to 0
    await store.set("total-count", "0");
    
    console.log(`🔄 Counter reset from ${oldCount} to 0`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: `Counter reset successfully`,
        previousCount: parseInt(oldCount),
        newCount: 0,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('❌ Error resetting count:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message 
      })
    };
  }
};