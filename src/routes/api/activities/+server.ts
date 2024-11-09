import { auth } from '$lib/auth.js';
import { prisma } from '$lib/prisma';

export const GET = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		return new Response('Not logged in', { status: 401 });
	}

	const activities = await prisma.activity.findMany({ where: { userId: session.user.id } });
	return new Response(JSON.stringify(activities), { status: 200 });
};

export const POST = async ({ request }) => {
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session) {
		return new Response('Not logged in', { status: 401 });
	}

	const newActivity = await request.json();
	await prisma.activity.create({ data: { ...newActivity, userId: session.user.id } });
	return new Response('Activity created successfully', { status: 200 });
};
