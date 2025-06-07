import { neon } from '@netlify/neon';

export default async () => {
  try {
    const sql = neon();
    const result = await sql`SELECT id, header, title, description, image, text, created_at FROM posts ORDER BY created_at DESC`;
    return Response.json(result);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};