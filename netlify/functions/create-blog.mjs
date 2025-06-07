import { neon } from '@neondatabase/serverless';

export async function handler(event, context) {
  console.log('create-blog function invoked');
  const sql = neon(process.env.NETLIFY_DATABASE_URL); // Use your env variable
  if (event.httpMethod === 'POST') {
    try {
      const { header, title, description, image, text } = JSON.parse(event.body);
      if (!header || !title || !description || !image || !text) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing fields' }),
        };
      }
      const result = await sql`
        INSERT INTO posts (header, title, description, image, text, created_at)
        VALUES (${header}, ${title}, ${description}, ${image}, ${text}, NOW())
        RETURNING id
      `;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, id: result[0].id }),
      };
    } catch (error) {
      console.error('Create blog error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else if (event.httpMethod === 'PUT') {
    try {
      const { id, header, title, description, image, text } = JSON.parse(event.body);
      if (!id || !header || !title || !description || !image || !text) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing fields' }),
        };
      }
      const result = await sql`
        UPDATE posts
        SET header = ${header}, title = ${title}, description = ${description}, image = ${image}, text = ${text}
        WHERE id = ${id}
      `;
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } catch (error) {
      console.error('Update blog error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
}