// netlify/functions/claude-proxy.js
// Agent Router (agentrouter.cc) version
// Env var to set in Netlify: AGENT_ROUTER_KEY = sk-d5rn...your key

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
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body);

    // Remove web_search tool — Agent Router doesn't support Anthropic-native tools
    // We'll rely on the model's training data for job info
    const cleanBody = {
      model: body.model || 'claude-sonnet-4-6',
      max_tokens: body.max_tokens || 2000,
      system: body.system,
      messages: body.messages
      // tools intentionally excluded
    };

    const response = await fetch('https://cc.agentrouter.cc/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.AGENT_ROUTER_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(cleanBody)
    });

    const data = await response.json();

    console.log('Agent Router response status:', response.status);
    console.log('Agent Router stop_reason:', data.stop_reason);
    console.log('Agent Router content types:', (data.content || []).map(b => b.type));

    if (!response.ok) {
      console.error('Agent Router API error:', JSON.stringify(data));
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error || 'API error' })
      };
    }

    return { statusCode: 200, headers, body: JSON.stringify(data) };

  } catch (err) {
    console.error('Proxy error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
