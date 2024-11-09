<script lang="ts">
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Circularbar from './circularbar.svelte';
	import {
		Chart,
		Tooltip,
		Legend,
		BarController,
		BarElement,
		CategoryScale,
		LinearScale
	} from 'chart.js';
	import { onMount } from 'svelte';
	import { Activity } from 'lucide-svelte';
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
	let chart;
	let chartElement: HTMLCanvasElement;

	onMount(() => {
		const style = getComputedStyle(document.body);
		const primaryColor = style.getPropertyValue('--primary').split(' ').join(', ');
		const foregroundMutedColor = style.getPropertyValue('--muted-foreground').split(' ').join(', ');
		chart = new Chart(chartElement, {
			type: 'bar',
			data: {
				labels: data.activities.map((activity) => activity.name),
				datasets: [
					{
						label: 'emissions',
						data: data.activities.map((activity) => activity.emission),
						backgroundColor: [`hsl(${primaryColor})`]
					}
				]
			}
		});
	});
</script>

<H1>Footprint</H1>

<Tabs.Root value="account" class="w-full">
	<Tabs.Content value="account">
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
			<Circularbar {color} bind:value={totalEmission}></Circularbar>
		</div>
	</Tabs.Content>
</Tabs.Root>
<div class="mb-2 w-full grow">
	<canvas bind:this={chartElement} id="chart-canvas"></canvas>
</div>
