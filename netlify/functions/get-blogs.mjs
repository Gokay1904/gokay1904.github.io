import { neon } from '@neondatabase/serverless';

export async function handler(event, context) {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    const result = await sql`
      SELECT id, header, title, description, image, text, created_at
      FROM posts
      ORDER BY created_at DESC
    `;
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    console.error('get-blogs error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}