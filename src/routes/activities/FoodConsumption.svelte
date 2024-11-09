<script lang="ts">
	import type { Activity } from './types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Check from 'lucide-svelte/icons/check';

	let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
	let foodConsumed = $state<number>();
	let selectedValue = $state<string>();

	let emissionFactor = $state<number>();
	let beef_checked = $state(false);
	let chicken_checked = $state(false);
	let vegetable_checked = $state(false);

	function foodUsage() {
		if (foodConsumed === undefined) return;
		let emissionFactor = 0;

		if (selectedValue === 'Beef') {
			const emission = foodConsumed * 2.7;
			addActivity({ name: 'Food Consumption', emission, time: new Date() });
		} else if (selectedValue === 'Chicken') {
			const emission = foodConsumed * 6.9;
			addActivity({ name: 'Food Consumption', emission, time: new Date() });
		} else if (selectedValue === 'Vegetables') {
			const emission = foodConsumed * emissionFactor;
			addActivity({ name: 'Food Consumption', emission, time: new Date() });
		}
	}
</script>

<form class="grid grid-cols-2 items-end gap-2" onsubmit={foodUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Food consumed</Label>
		<Input
			type="number"
			id="foodConsumed"
			placeholder="in km"
			step={0.01}
			bind:value={foodConsumed}
		/>
	</div>

	<div class="flex flex-col gap-1.5">
		<Label>Select food type</Label>
		<Select.Root type="single" bind:value={selectedValue}>
			<Select.Trigger class="w-full">
				{#if selectedValue}
					{selectedValue}
				{:else}
					Select Food Type
				{/if}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="Beef">Beef</Select.Item>
				<Select.Item value="Chicken">Chicken</Select.Item>
				<Select.Item value="Vegetables">Vegetables</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>

	<Button type="submit" class="col-span-2 ml-auto mt-4">Add activity</Button>
</form>
