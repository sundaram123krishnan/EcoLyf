<script lang="ts">
	import { DirectionAwareHover } from '$lib/components/DirectionAwareHover';
	import TextGenerateEffect from '$lib/components/TextGenerateEffect/TextGenerateEffect.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import {
		BarController,
		BarElement,
		CategoryScale,
		Chart,
		Legend,
		LinearScale,
		Tooltip
	} from 'chart.js';
	import { Brain } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Circularbar from './circularbar.svelte';

	Chart.register(Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);

	let { data } = $props();
	let totalEmission = $state(
		Number((data.activities.reduce((sum, activity) => sum + activity.emission, 0) * 100).toFixed(2))
	);

	let sortedActivities = [...data.activities].sort((a, b) => b.emission - a.emission).slice(0, 5);
	let color = $state('');
	if (totalEmission < 50) {
		color = 'green';
	} else if (totalEmission >= 75 && totalEmission <= 100) {
		color = 'yellow';
	} else {
		color = 'red';
	}

	const userResponse: Record<string, string> = {
		'sundaram krishnan': `Use Renewable Energy: Opt for solar, wind or hydroelectric power. Reduce Vehicle Emissions: Use public transport. Save Energy: Use efficient appliances and turn off unused electronics`,
		'Yash Kolekar':
			'Reducing vehicle usage helps cut down on harmful emissions, preserving air quality and reducing our carbon footprint. Consider carpooling, using public transport, or biking for a more sustainable commute and a healthier planet.'
	};

	let chartElement: HTMLCanvasElement;
	let filteredText = $derived(userResponse[data.user.name as string]);

	onMount(() => {
		new Chart(chartElement, {
			type: 'bar',
			data: {
				labels: data.activities.map((activity) => activity.name),
				datasets: [
					{
						label: 'Emissions',
						data: data.activities.map((activity) => activity.emission),
						backgroundColor: ['green']
					}
				]
			}
		});
	});
</script>

<H1>Footprint</H1>

<div class="grid grid-cols-2 gap-2">
	<div class="relative flex h-fit items-center justify-center">
		<div class="absolute left-0 top-0 z-20 w-full rounded-t-md bg-black/60 p-2 text-white">
			<p class="text-xl font-bold">Total emissions</p>
			<p class="text-sm font-normal"><span class="font-semibold">{totalEmission}</span> CO2/kg</p>
		</div>
		<DirectionAwareHover
			imageUrl="https://png.pngtree.com/thumb_back/fh260/background/20200807/pngtree-honeycomb-carbon-fiber-background-dark-and-blue-tones-image_387338.jpg"
		>
			<p class="text-lg font-medium">Top 5 emissions today:</p>
			<ul class="ml-4 list-disc text-sm">
				{#each sortedActivities.slice(0, 5) as activity}
					<li>{activity.name}</li>
				{/each}
			</ul>
		</DirectionAwareHover>
	</div>

	<Card.Root class="p-6">
		<Card.Content class="p-2">
			<Circularbar {color} value={Number((totalEmission / 12.3).toFixed(1))}></Circularbar>
		</Card.Content>
		{#if Number((totalEmission / 12.3).toFixed(1)) >= 75}
			<Card.Footer class="p-2">
				<Dialog.Root>
					<Dialog.Trigger>
						{#snippet child({ props })}
							<Button class="mx-auto" {...props}>
								Suggest improvements
								<Brain />
							</Button>
						{/snippet}
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>AI suggestions</Dialog.Title>
							<Dialog.Description>Based on your activities.</Dialog.Description>
						</Dialog.Header>
						<TextGenerateEffect words={filteredText} />
					</Dialog.Content>
				</Dialog.Root>
			</Card.Footer>
		{/if}
	</Card.Root>
</div>

<Card.Root class="w-full grow p-4">
	<canvas bind:this={chartElement} id="chart-canvas"></canvas>
</Card.Root>
