export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const { password } = await request.json();
  if (password === process.env.ADMIN_PASSWORD) {
    return Response.json({ success: true });
  }
  return Response.json({ success: false }, { status: 401 });
};