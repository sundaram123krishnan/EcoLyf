<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import { arraySum } from '$lib/utils.js';
	import { Medal } from 'lucide-svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let { data } = $props();

	const sortedUserData = data.userData.sort(
		(a, b) =>
			arraySum(a.Activity.map(({ emission }) => emission)) -
			arraySum(b.Activity.map(({ emission }) => emission))
	);

	const sortedFamilyData = data.familyData.sort(
		(a, b) =>
			arraySum(
				a.members.map((member) => arraySum(member.Activity.map(({ emission }) => emission)))
			) -
			arraySum(b.members.map((member) => arraySum(member.Activity.map(({ emission }) => emission))))
	);
</script>

<H1>Leaderboard</H1>

<Tabs.Root value="users" class="w-full">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="users">Users</Tabs.Trigger>
		<Tabs.Trigger value="families">Families</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="users">
		<Table.Root>
			<Table.Caption>Eco-lyf users leaderboard.</Table.Caption>
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
							{#if idx <= 2}
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
	</Tabs.Content>
	<Tabs.Content value="families">
		<Table.Root>
			<Table.Caption>Eco-lyf families leaderboard.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Rank</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head class="text-right">Emissions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each sortedFamilyData as familyData, idx}
					<Table.Row>
						<Table.Cell class="inline-flex items-center gap-2 font-medium">
							{#if idx <= 2}
								<Medal class="text-primary" />
							{/if}
							{idx + 1}
						</Table.Cell>
						<Table.Cell>{familyData.familyName}</Table.Cell>
						<Table.Cell class="text-right">
							{arraySum(
								familyData.members.map((member) =>
									arraySum(member.Activity.map(({ emission }) => emission))
								)
							)}
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Tabs.Content>
</Tabs.Root>
