<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Activity } from './types';

	let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
	let cigaretteSmoked = $state<number>();

	function cigeratteUsage() {
		if (cigaretteSmoked === undefined) return;
		const emission = cigaretteSmoked * 0.2;
		addActivity({ name: 'Cigerattes Smoked', emission, time: new Date() });
	}
</script>

<form onsubmit={cigeratteUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Cigerattes Smoked</Label>
		<Input
			type="number"
			id="distance-travelled"
			placeholder="packs of cigeratte smoked"
			step={0.01}
			bind:value={cigaretteSmoked}
		/>
	</div>
	<Button type="submit">Add activity</Button>
</form>
