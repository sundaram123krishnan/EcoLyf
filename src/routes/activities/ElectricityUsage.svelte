<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Activity } from './types';

	let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
	let electricityUsage = $state<number>();
	let emissionFactor = $state<number>();

	function addElectricityUsage() {
		if (electricityUsage === undefined || emissionFactor === undefined) return;
		const emission = electricityUsage * emissionFactor;
		addActivity({ name: 'Electricity usage', emission, createdAt: new Date() });
	}
</script>

<form class="grid grid-cols-2 gap-2" onsubmit={addElectricityUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Electricity usage</Label>
		<Input
			type="number"
			id="electricity-usage"
			placeholder="in kWh"
			required
			step={0.01}
			bind:value={electricityUsage}
		/>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="emission-factor">Emission factor</Label>
		<Input
			type="number"
			required
			id="emission-factor"
			placeholder="~0.91 for coal"
			step={0.01}
			bind:value={emissionFactor}
		/>
	</div>
	<Button type="submit" class="col-span-2 ml-auto mt-4">Add activity</Button>
</form>
