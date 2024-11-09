import { auth } from '$lib/auth.js';
import { prisma } from '$lib/prisma';

export const POST = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		return new Response('Not logged in', { status: 401 });
	}

	const newProduct = await request.json();
	await prisma.activity.create({ data: { ...newProduct, userId: session.user.id } });
	return new Response('Product added successfully', { status: 200 });
};
