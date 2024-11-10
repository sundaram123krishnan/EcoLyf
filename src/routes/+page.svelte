<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { CardStack } from '$lib/components/ui/CardStack';

	let { data } = $props();

	const IMAGES = [
		{ id: 0, image: '/Activities.png', text: 'Log your activities' },
		{ id: 1, image: '/Activities.png', text: 'Log your activities' }
	];
</script>

<div class="mx-auto grid max-w-lg gap-6 py-12">
	<div class="flex flex-col gap-3">
		<p class="text-3xl font-bold">Complete carbon tracking solution</p>
		<span class="text-muted-foreground">
			With food ecoscores, vast list of activity tracking, and leaderboards
		</span>
	</div>

	<div class="grid grid-cols-3 gap-2">
		<Card.Root>
			<Card.Content class="space-y-4 p-4 text-center">
				<Card.Description class="text-center">Activities</Card.Description>
				<p class="text-xl font-bold">{data.activityCount}</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Content class="space-y-4 p-4 text-center">
				<Card.Description class="text-center">Foods</Card.Description>
				<p class="text-xl font-bold">{data.foodCount}</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Content class="space-y-4 p-4 text-center">
				<Card.Description class="text-center">Emissions</Card.Description>
				<p class="text-xl font-bold">{data.totalEmission}</p>
			</Card.Content>
		</Card.Root>
		<span class="col-span-3 text-center italic text-muted-foreground">have been tracked!</span>
	</div>

	<CardStack items={IMAGES} />
</div>
