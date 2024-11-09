<script lang="ts">
    import type { Activity } from "./types";
    import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Page from "../+page.svelte";


    let { addActivity }: { addActivity: (activity: Activity) => void } = $props();
    let wasteGenerated = $state<number>();
    let selectedValue = $state<string>();
    let emissionFactors = $state<number>();

    function addWaste() {
        if (wasteGenerated === undefined || selectedValue === undefined || emissionFactors === undefined) return;
        if (selectedValue === "landfill") {
            const emission = (wasteGenerated * 0.002);
            addActivity({name: "Waste", emission, time: new Date()})
        }
        else if(selectedValue === "compostable") {
            const emission = (wasteGenerated * 0.005);
            addActivity({name: "Waste", emission, time: new Date()})
        }
        else if (selectedValue === "recyclable") {
            const emission = (wasteGenerated * 0.775);
            addActivity({name: "Waste", emission, time: new Date()})
        }
    }
</script>
<form onsubmit={addWaste}>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="electricity-usage">Distance Travelled</Label>
		<Input
			type="number"
			id="waste-generated"
			placeholder="in kg"
			step={0.01}
			bind:value={wasteGenerated}
		/>
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="emission-factor">Fuel Efficiency</Label>
		<Input
			type="number"
			id="emission-factor"
			placeholder="km/l"
			step={0.01}
			bind:value={emissionFactors}
		/>
	</div>
    <Select.Root type="single" bind:value={selectedValue}>
        <Select.Trigger class="w-fit">
            {#if selectedValue}
                {selectedValue}
            {:else}
                Select Waste Type
            {/if}
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="recyclable">Recyclable</Select.Item>
            <Select.Item value="landfill">LandFill</Select.Item>
            <Select.Item value="compostable">Compostable</Select.Item>
        </Select.Content>
    </Select.Root>
	<Button type="submit">Add activity</Button>
</form>