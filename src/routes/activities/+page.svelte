<script lang="ts">

    import * as Select from "$lib/components/ui/select/index.js";

</script>

<h1>Add Activity</h1>

<Select.Root type="single">
    <Select.Trigger class="w-[180px]"></Select.Trigger>
    <Select.Content>
      <Select.Item value="private vehicles">Private Vehicles</Select.Item>
      <Select.Item value="waste disposal">Waste Disposal</Select.Item>
      <Select.Item value="plastics usage">Plastics Usage</Select.Item>
      <Select.Item value="water usage">Excessive Water Usage</Select.Item>
      <Select.Item value="smoking indoors">Smoking Indoors</Select.Item>
      <Select.Item value="using aerosols">Using Aerosols</Select.Item>
    </Select.Content>
  </Select.Root>

