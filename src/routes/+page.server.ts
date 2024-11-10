import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();
	if (!session) error(401, 'Not logged in');

	const activityEmission = (
		await prisma.activity.aggregate({ _sum: { emission: true }, where: { isFood: false } })
	)._sum.emission as number;
	const foodEmission = (
		await prisma.activity.aggregate({ _sum: { emission: true }, where: { isFood: true } })
	)._sum.emission as number;

	return {
		activityCount: await prisma.activity.count({ where: { isFood: false } }),
		foodCount: await prisma.activity.count({ where: { isFood: true } }),
		totalEmission: activityEmission + foodEmission
	};
};
