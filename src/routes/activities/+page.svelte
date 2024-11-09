<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import ElectricityUsage from './ElectricityUsage.svelte';
	import FoodConsumption from './FoodConsumption.svelte';
	import SmokingIndoors from './SmokingIndoors.svelte';
	import type { Activity } from './types';
	import VehicleUsage from './VehicleUsage.svelte';
	import WasteDisposal from './WasteDisposal.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let activities: Activity[] = $state([]);
	let selectedValue = $state<string>();

	function addActivity(activity: Activity) {
		activities.push(activity);
	}

	$inspect(activities);
</script>

<H1>Activities</H1>

<Tabs.Root value="table" class="w-full">
	<Tabs.List class="grid grid-cols-2">
		<Tabs.Trigger value="table">All activities</Tabs.Trigger>
		<Tabs.Trigger value="add">Add activity</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="table"></Tabs.Content>
	<Tabs.Content value="add">
		<Card.Root>
			<Card.Header>
				<Card.Title>Add an activity</Card.Title>
				<Card.Description>Log your carbon emissions here.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-1.5">
					<Label>Activity type</Label>
					<Select.Root type="single" bind:value={selectedValue}>
						<Select.Trigger class="mb-4 w-full">
							{#if selectedValue}
								{selectedValue}
							{:else}
								Pick an activity to add
							{/if}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="Private vehicles">Private vehicles</Select.Item>
							<Select.Item value="Electricity consumption">Electricity consumption</Select.Item>
							<Select.Item value="Waste disposal">Waste disposal</Select.Item>
							<Select.Item value="Food consumption">Food Consumption</Select.Item>
							<Select.Item value="Smoking indoors">Smoking indoors</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
				{#if selectedValue === 'Electricity consumption'}
					<ElectricityUsage {addActivity} />
				{:else if selectedValue === 'Private vehicles'}
					<VehicleUsage {addActivity} />
				{:else if selectedValue === 'Waste disposal'}
					<WasteDisposal {addActivity} />
				{:else if selectedValue === 'Food consumption'}
					<FoodConsumption {addActivity} />
				{:else if selectedValue === 'Smoking indoors'}
					<SmokingIndoors {addActivity} />
				{/if}
			</Card.Content>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
