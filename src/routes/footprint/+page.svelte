<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	import {
		BarController,
		BarElement,
		CategoryScale,
		Chart,
		Legend,
		LinearScale,
		Tooltip
	} from 'chart.js';
	import { onMount } from 'svelte';
	import Circularbar from './circularbar.svelte';
	import { DirectionAwareHover } from '$lib/components/DirectionAwareHover';
	import TextGenerateEffect from '$lib/components/TextGenerateEffect/TextGenerateEffect.svelte';

	Chart.register(Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);

	let { data } = $props();
	let totalEmission = data.activities.reduce((sum, activity) => sum + activity.emission, 0);
	totalEmission = Number((totalEmission * 100).toFixed(2));

	let sortedActivities = [...data.activities].sort((a, b) => b.emission - a.emission).slice(0, 5);
	let color = '';
	if (totalEmission < 50) {
		color = 'green';
	} else if (totalEmission >= 75 && totalEmission <= 100) {
		color = 'yellow';
	} else {
		color = 'red';
	}

	const userResponse = {
		sundaram: `Use Renewable Energy: Opt for solar, wind or hydroelectric power. Reduce Vehicle Emissions: Use public transport. Save Energy: Use efficient appliances and turn off unused electronics`,
		yash: 'Conserve Water: Reducing water usage cuts energy. Limit Air Travel, Recycle and compost: Reduce waste in landfills, which lowers methane emissions'
	};

	let chart;
	let chartElement: HTMLCanvasElement;
	let generatedText = $state<string>();

	let toggle = $state(false);
	function toggler() {
		if (totalEmission >= 75) {
			toggle = true;
		}
	}
	let filteredText = $state<string>(userResponse.sundaram);

	onMount(() => {
		const style = getComputedStyle(document.body);
		const primaryColor = style.getPropertyValue('--primary').split(' ').join(', ');
		chart = new Chart(chartElement, {
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

<div class="grid grid-cols-2">
	<div class="relative flex items-center justify-center">
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

	<div class="p-6">
		<Circularbar {color} value={Number((totalEmission / 12.3).toFixed(1))}></Circularbar>
	</div>
</div>
<Card.Root class="w-full grow p-4">
	<canvas bind:this={chartElement} id="chart-canvas"></canvas>
</Card.Root>
<div>
	<Button onclick={toggler}>Suggest</Button>
	{#if toggle}
		<TextGenerateEffect words={filteredText} />
	{/if}
</div>
