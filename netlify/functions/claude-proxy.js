// netlify/functions/claude-proxy.js
// Place at: netlify/functions/claude-proxy.js in your repo root
// Set ANTHROPIC_API_KEY in Netlify → Site Settings → Environment Variables

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*', // restrict to your domain in prod
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Log for debugging in Netlify function logs
    console.log('Anthropic response status:', response.status);
    console.log('Anthropic response stop_reason:', data.stop_reason);
    console.log('Anthropic response content types:', (data.content || []).map(b => b.type));

    if (!response.ok) {
      console.error('Anthropic API error:', JSON.stringify(data));
      return { statusCode: response.status, headers, body: JSON.stringify({ error: data.error || 'API error' }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify(data) };

  } catch (err) {
    console.error('Proxy error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
