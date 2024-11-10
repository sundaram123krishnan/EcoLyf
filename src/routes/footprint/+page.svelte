<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
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
	import { onMount } from 'svelte';
	import Circularbar from './circularbar.svelte';
	import { DirectionAwareHover } from '$lib/components/DirectionAwareHover';
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

	let filteredText = $state<string>();
	let chart;
	let chartElement: HTMLCanvasElement;
	let generatedText = $state<string>();

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
						backgroundColor: [`hsl(${primaryColor})`]
					}
				]
			}
		});
	});

	
	async function generateSuggestions() {
		const response = await fetch('/api/ai', {
			method: 'POST',
			body: JSON.stringify(
				`give me suggestions to improve my carbon emissions based on the following data: ${JSON.stringify(data.activities)}`
			)
		});
		const generatedText = await response.text();
		
		const start = generatedText.indexOf("rply") + "rply".length;
		const result = generatedText.slice(start).trim().slice(3).slice(0, -3);
		filteredText = result;
	}
</script>

<H1>Footprint</H1>

<div class="grid grid-cols-2">
	<div class="relative flex items-center justify-center">
		<div class="absolute left-0 top-0 rounded-t-md p-2 z-20 w-full bg-black/60 text-white">
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
<Card.Root>
	<button onclick={generateSuggestions}>click</button>
	{#if filteredText}
		<p>{filteredText}</p>
	{/if}
</Card.Root>
