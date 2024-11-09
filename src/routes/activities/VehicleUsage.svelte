<script lang="ts">
	import type { Activity } from "./types";
    import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';


    let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
    let distanceTravelled = $state<number>();
    let fuelEfficiency = $state<number>();
    let selectedValue = $state<string>();

    function addVehiclesUsage() {
        if (distanceTravelled === undefined || fuelEfficiency === undefined || selectedValue === undefined) return;
        if (selectedValue === "petrol") {
            let footprint = (distanceTravelled * fuelEfficiency * 2.31) / 100;
            addActivity({name: 'Vehicles', emission: footprint, time: new Date()})

        }
        else if (selectedValue === "diesel") {
            let footprint = (distanceTravelled * fuelEfficiency * 2.68) / 100;
            addActivity({name: 'Vehicles', emission: footprint, time: new Date()})
        }
        console.log(selectedValue);
    }
    
</script>

<form onsubmit={addVehiclesUsage}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Distance Travelled</Label>
		<Input
			type="number"
			id="distance-travelled"
			placeholder="in km"
			step={0.01}
			bind:value={distanceTravelled}
		/>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="emission-factor">Fuel Efficiency</Label>
		<Input
			type="number"
			id="fuel-efficiency"
			placeholder="km/l"
			step={0.01}
			bind:value={fuelEfficiency}
		/>
	</div>
    <Select.Root type="single" bind:value={selectedValue}>
        <Select.Trigger class="w-fit">
            {#if selectedValue}
                {selectedValue}
            {:else}
                Select Fuel Type
            {/if}
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="petrol">Petrol</Select.Item>
            <Select.Item value="diesel">Diesel</Select.Item>
        </Select.Content>
    </Select.Root>
	<Button type="submit">Add activity</Button>
</form>