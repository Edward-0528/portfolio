const https = require('https');

exports.handler = async (event) => {
  const username = event.queryStringParameters?.username || 'edward-granados';

  // Only allow safe usernames (alphanumeric + hyphens)
  if (!/^[a-z0-9-]+$/i.test(username)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid username' }) };
  }

  const url = `https://www.credly.com/users/${username}/badges.json`;

  try {
    const data = await new Promise((resolve, reject) => {
      https.get(
        url,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (portfolio-site)',
            Accept: 'application/json',
          },
        },
        (res) => {
          let body = '';
          res.on('data', (chunk) => (body += chunk));
          res.on('end', () => resolve({ status: res.statusCode, body }));
          res.on('error', reject);
        }
      ).on('error', reject);
    });

    if (data.status !== 200) {
      return {
        statusCode: data.status,
        body: JSON.stringify({ error: `Credly returned ${data.status}` }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache 1 hour
        'Access-Control-Allow-Origin': '*',
      },
      body: data.body,
    };
  } catch (err) {
    console.error('Credly proxy error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch badges' }),
    };
  }
};
