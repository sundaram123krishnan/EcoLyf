<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Activity } from './types';

	let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
	let cigaretteSmoked = $state<number>();

	function cigaretteUsage() {
		if (cigaretteSmoked === undefined) return;
		const emission = cigaretteSmoked * 0.2;
		addActivity({ name: 'Cigarettes Smoked', emission, time: new Date() });
	}
</script>

<form class="grid grid-cols-2 items-end gap-2" onsubmit={cigaretteUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Cigarettes smoked</Label>
		<Input
			type="number"
			id="distance-travelled"
			placeholder="Total packs smoked"
			step={0.01}
			bind:value={cigaretteSmoked}
		/>
	</div>
	<Button type="submit" class="col-span-2 ml-auto mt-4">Add activity</Button>
</form>
