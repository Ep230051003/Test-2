// netlify/functions/response.js
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Replace * with your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse and validate the request body
    let data;
    try {
      data = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON body' })
      };
    }

    // Validate response value
    if (!data.response || !['yes', 'no'].includes(data.response.toLowerCase())) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid response value. Must be "yes" or "no"' })
      };
    }

    // Create a log entry object
    const logEntry = {
      response: data.response.toLowerCase(),
      timestamp: new Date().toISOString(),
      userAgent: event.headers['user-agent'] || 'Unknown',
      ipAddress: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'Unknown',
      referrer: event.headers['referer'] || 'Unknown'
    };

    // Log the response (this will appear in your Netlify function logs)
    console.log('Valentine Response:', JSON.stringify(logEntry));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Response logged successfully',
        timestamp: logEntry.timestamp
      })
    };

  } catch (error) {
    console.error('Error logging response:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to log response'
      })
    };
  }
};
