import { neon } from '@neondatabase/serverless';

export async function handler(event, context) {
  // Only allow DELETE method
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Get blog ID from query string
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing blog id' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    const result = await sql`DELETE FROM posts WHERE id = ${id} RETURNING id`;
    if (result.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Blog post not found' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Delete blog error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}