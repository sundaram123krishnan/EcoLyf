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
		addActivity({ name: 'Electricity usage', emission, time: new Date() });
	}
</script>

<form onsubmit={addElectricityUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Electricity usage</Label>
		<Input
			type="number"
			id="electricity-usage"
			placeholder="in kWh"
			bind:value={electricityUsage}
		/>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="emission-factor">Emission factor</Label>
		<Input
			type="number"
			id="emission-factor"
			placeholder="~0.91 for coal"
			bind:value={emissionFactor}
		/>
	</div>
	<Button type="submit">Add activity</Button>
</form>
