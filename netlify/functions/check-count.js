import { getStore } from "@netlify/blobs";

/**
 * Gibt den aktuellen Submission-Counter zurück
 * Aufruf: GET https://potluck-ms.vibezone.space/.netlify/functions/check-count
 */
export async function handler(event, context) {
  try {
    const store = getStore("potluck-submissions");
    
    // Get total count
    const count = parseInt(await store.get("total-count") || "0");
    
    // Calculate batch info
    const currentBatch = count === 0 ? 0 : Math.ceil(count / 12);
    const spotsInCurrentBatch = count === 0 ? 0 : ((count - 1) % 12) + 1;
    const spotsRemainingInBatch = count === 0 ? 12 : 12 - spotsInCurrentBatch;
    
    // Get last few submissions (optional)
    const recentSubmissions = [];
    const startIndex = Math.max(1, count - 5);
    
    for (let i = startIndex; i <= count; i++) {
      const submissionData = await store.get(`submission-${i}`);
      if (submissionData) {
        recentSubmissions.push(JSON.parse(submissionData));
      }
    }
    
    // Response
    const response = {
      totalSubmissions: count,
      currentBatch: currentBatch,
      spotsInCurrentBatch: spotsInCurrentBatch,
      spotsRemainingInBatch: spotsRemainingInBatch,
      nextSubmissionWillBe: count + 1,
      nextSubmissionBatch: count < 12 ? 1 : Math.ceil((count + 1) / 12),
      recentSubmissions: recentSubmissions
    };
    
    console.log('✅ Count check:', response);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response, null, 2)
    };
    
  } catch (error) {
    console.error('❌ Error checking count:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message 
      })
    };
  }
}