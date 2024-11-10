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
	<Card.Root>
		<Card.Header>
			<Card.Title>Top 5 Emission Activities</Card.Title>
			<Card.Description>Here are the activities with the highest emissions.</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-2">
			<ul class="space-y-1">
				{#each sortedActivities as activity}
					<li>{activity.name}: {activity.emission}</li>
				{/each}
			</ul>
		</Card.Content>
		<Card.Footer>
			<p>Total Emission: {totalEmission} %</p>
		</Card.Footer>
	</Card.Root>
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
