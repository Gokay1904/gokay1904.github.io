import { neon } from '@neondatabase/serverless';

export async function handler(event, context) {
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
    const result = await sql`SELECT * FROM posts WHERE id = ${id}`;
    if (result.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Blog not found.' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result[0]),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}