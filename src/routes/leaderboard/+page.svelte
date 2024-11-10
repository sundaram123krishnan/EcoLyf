<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import { arraySum } from '$lib/utils.js';
	import { Medal } from 'lucide-svelte';

	let { data } = $props();

	const sortedUserData = data.userData.sort(
		(a, b) =>
			arraySum(a.Activity.map(({ emission }) => emission)) -
			arraySum(b.Activity.map(({ emission }) => emission))
	);
</script>

<H1>Leaderboard</H1>

<Table.Root>
	<Table.Caption>Eco-lyf leaderboard.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Rank</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head class="text-right">Emissions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each sortedUserData as userData, idx}
			<Table.Row>
				<Table.Cell class="inline-flex items-center gap-2 font-medium">
					{#if idx < 2}
						<Medal class="text-primary" />
					{/if}
					{idx + 1}
				</Table.Cell>
				<Table.Cell>{userData.name}</Table.Cell>
				<Table.Cell class="text-right">
					{arraySum(userData.Activity.map(({ emission }) => emission))}
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
