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

		if (selectedValue === 'beef') {
			const emission = foodConsumed * 2.7;
			addActivity({ name: 'Food Consumption', emission, time: new Date() });
		} else if (selectedValue === 'chicken') {
			const emission = foodConsumed * 6.9;
			addActivity({ name: 'Food Consumption', emission, time: new Date() });
		} else if (selectedValue === 'vegetables') {
			const emission = foodConsumed * emissionFactor;
			addActivity({ name: 'Food Consumption', emission, time: new Date() });
		}
	}
</script>

<form onsubmit={foodUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Food Consumed</Label>
		<Input
			type="number"
			id="foodConsumed"
			placeholder="in km"
			step={0.01}
			bind:value={foodConsumed}
		/>
	</div>

	<Select.Root type="single" bind:value={selectedValue}>
		<Select.Trigger class="w-fit">
			{#if selectedValue}
				{selectedValue}
			{:else}
				Select Food Type
			{/if}
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="beef">Beef</Select.Item>
			<Select.Item value="chicken">chicken</Select.Item>
			<Select.Item value="vegetables">vegetables</Select.Item>
		</Select.Content>
	</Select.Root>

	<Button type="submit">Add activity</Button>
</form>
