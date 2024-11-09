<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { Activity } from './types';

	let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
	let wasteGenerated = $state<number>();
	let selectedValue = $state<string>();
	let emissionFactors = $state<number>();

	function addWaste() {
		if (
			wasteGenerated === undefined ||
			selectedValue === undefined ||
			emissionFactors === undefined
		)
			return;
		if (selectedValue === 'Landfill') {
			const emission = wasteGenerated * 0.002;
			addActivity({ name: 'Waste', emission, createdAt: new Date() });
		} else if (selectedValue === 'Compostable') {
			const emission = wasteGenerated * 0.005;
			addActivity({ name: 'Waste', emission, createdAt: new Date() });
		} else if (selectedValue === 'Recyclable') {
			const emission = wasteGenerated * 0.775;
			addActivity({ name: 'Waste', emission, createdAt: new Date() });
		}
	}
</script>

<form class="grid grid-cols-2 items-end gap-2" onsubmit={addWaste}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Distance traveled</Label>
		<Input
			type="number"
			id="waste-generated"
			placeholder="in km"
			step={0.01}
			bind:value={wasteGenerated}
		/>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="emission-factor">Fuel efficiency</Label>
		<Input
			type="number"
			id="emission-factor"
			placeholder="km/l"
			step={0.01}
			bind:value={emissionFactors}
		/>
	</div>
	<div class="flex flex-col gap-1.5">
		<Label>Select waste type</Label>
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger class="w-full">
				{#if selectedValue}
					{selectedValue}
				{:else}
					Select type
				{/if}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="Recyclable">Recyclable</Select.Item>
				<Select.Item value="Landfill">Landfill</Select.Item>
				<Select.Item value="Compostable">Compostable</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
	<Button type="submit" class="col-span-2 ml-auto mt-4">Add activity</Button>
</form>
