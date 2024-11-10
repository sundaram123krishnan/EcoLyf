<script lang="ts">
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { arraySum } from '$lib/utils';

	let { data, form } = $props();
	let familyId = $state('');
	let newFamilyName = $state('');

	$effect(() => {
		if (form?.success) toast.success(form.message);
	});
</script>

<H1>Account</H1>

<Card.Root>
	<Card.Header>
		<Card.Title>Family</Card.Title>
		<Card.Description>Manage your family relation here.</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		{#if data.userData.family}
			<p>
				You are a member of <span class="font-semibold">{data.userData.family.familyName}</span><br
				/>
				Family ID is:
				<span class="italic text-muted-foreground">{data.userData.family.familyId}</span>
			</p>
			<Table.Root>
				<Table.Caption>A list of your family members.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">No.</Table.Head>
						<Table.Head>Name</Table.Head>
						<Table.Head>Emissions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.userData.family.members as familyMember, idx}
						<Table.Row>
							<Table.Cell class="font-medium">{idx + 1}</Table.Cell>
							<Table.Cell>{familyMember.name}</Table.Cell>
							<Table.Cell>
								{arraySum(familyMember.Activity.map(({ emission }) => emission))}
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{:else}
			<p>You aren't a member of any family yet.</p>
			<div class="grid grid-cols-2 gap-2">
				<form class="space-y-2" method="POST" action="?/attachFamily">
					<Input
						name="family-id"
						placeholder="Type the family ID here"
						required
						bind:value={familyId}
					/>
					<Button type="submit">Join family</Button>
				</form>

				<form class="space-y-2" method="POST" action="?/createFamily">
					<Input
						name="new-family-name"
						placeholder="Type the family name here"
						required
						bind:value={newFamilyName}
					/>
					<Button type="submit">Create family</Button>
				</form>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
