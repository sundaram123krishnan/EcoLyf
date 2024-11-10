import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();
	if (!session) error(401, 'Not logged in');

	const userData = await prisma.user.findMany({ select: { Activity: true } });
	return { userData };
};
