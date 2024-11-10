import { auth } from '$lib/auth.js';
import { prisma } from '$lib/prisma.js';
import { error } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();
	if (!session) error(401, 'Not logged in');

	const userData = await prisma.user.findUniqueOrThrow({
		where: { id: session.userId },
		include: { family: { include: { members: { select: { name: true, Activity: true } } } } }
	});

	return { userData };
};

export const actions = {
	createFamily: async ({ request }) => {
		const data = await request.formData();
		const newFamilyName = data.get('new-family-name') as string;

		const newFamily = await prisma.family.create({ data: { familyName: newFamilyName } });
		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) error(401, 'Not logged in');

		await prisma.user.update({
			where: { id: session.user.id },
			data: { familyId: newFamily.familyId }
		});

		return { success: true, message: 'New family created successfully' };
	},

	attachFamily: async ({ request }) => {
		const data = await request.formData();
		const familyId = data.get('family-id') as string;

		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) error(401, 'Not logged in');

		await prisma.user.update({
			where: { id: session.user.id },
			data: { familyId }
		});

		return { success: true, message: 'Joined family successfully' };
	}
};
