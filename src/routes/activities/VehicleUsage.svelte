<script lang="ts">
	import type { Activity } from './types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
	let distanceTraveled = $state<number>();
	let fuelEfficiency = $state<number>();
	let selectedValue = $state<string>();

	function addVehiclesUsage() {
		if (
			distanceTraveled === undefined ||
			fuelEfficiency === undefined ||
			selectedValue === undefined
		)
			return;
		if (selectedValue === 'Petrol') {
			let footprint = (distanceTraveled * fuelEfficiency * 2.31) / 100;
			addActivity({ name: 'Vehicles', emission: footprint, createdAt: new Date() });
		} else if (selectedValue === 'Diesel') {
			let footprint = (distanceTraveled * fuelEfficiency * 2.68) / 100;
			addActivity({ name: 'Vehicles', emission: footprint, createdAt: new Date() });
		}
		console.log(selectedValue);
	}
</script>

<form class="grid grid-cols-2 items-end gap-2" onsubmit={addVehiclesUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Distance traveled</Label>
		<Input
			type="number"
			id="distance-travelled"
			placeholder="in km"
			step={0.01}
			bind:value={distanceTraveled}
		/>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="emission-factor">Fuel efficiency</Label>
		<Input
			type="number"
			id="fuel-efficiency"
			placeholder="km/l"
			step={0.01}
			bind:value={fuelEfficiency}
		/>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label for="fuel-type">Fuel type</Label>
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger id="fuel-type" class="w-full">
				{#if selectedValue}
					{selectedValue}
				{:else}
					Select type
				{/if}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="Petrol">Petrol</Select.Item>
				<Select.Item value="Diesel">Diesel</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<Button type="submit" class="col-span-2 ml-auto mt-4">Add activity</Button>
</form>
