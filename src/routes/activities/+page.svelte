<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import ElectricityUsage from './ElectricityUsage.svelte';
	import type { Activity } from './types';
	import VehicleUsage from './VehicleUsage.svelte';
	import WasteDisposal from './WasteDisposal.svelte';

	let activities: Activity[] = $state([]);
	let selectedValue = $state<string>();

	function addActivity(activity: Activity) {
		activities.push(activity);
	}

	$inspect(activities);
</script>

<h1>Add Activity</h1>

<Select.Root type="single" bind:value={selectedValue}>
	<Select.Trigger class="w-fit">
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
		<Select.Item value="Plastics usage">Plastics usage</Select.Item>
		<Select.Item value="Water usage">Water usage</Select.Item>
		<Select.Item value="Smoking indoors">Smoking indoors</Select.Item>
		<Select.Item value="Using aerosols">Using aerosols</Select.Item>
	</Select.Content>
</Select.Root>

{#if selectedValue === 'Electricity consumption'}
	<ElectricityUsage {addActivity} />
	{:else if selectedValue === "Private vehicles"}
	<VehicleUsage {addActivity}/>
	{:else if selectedValue === "Waste disposal"}
	<WasteDisposal {addActivity}/>


{/if}
