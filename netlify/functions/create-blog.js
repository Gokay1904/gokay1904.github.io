import { neon } from '@netlify/neon';

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const { header, title, description, image, text } = await request.json();
    if (!header || !title || !description || !image || !text) {
      return new Response('Missing fields', { status: 400 });
    }
    const sql = neon(); // uses NETLIFY_DATABASE_URL automatically
    const result = await sql`
      INSERT INTO posts (header, title, description, image, text, created_at)
      VALUES (${header}, ${title}, ${description}, ${image}, ${text}, NOW())
      RETURNING id
    `;
    return Response.json({ success: true, id: result[0].id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};