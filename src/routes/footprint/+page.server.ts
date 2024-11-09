import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();
	if (!session) error(401, 'Not logged in');

	const activities = await prisma.activity.findMany({ where: { userId: session.userId } });
	return { activities };
};
