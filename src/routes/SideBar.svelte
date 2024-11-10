<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '$lib/auth-client';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Apple, Flame, Footprints, Medal } from 'lucide-svelte';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import House from 'lucide-svelte/icons/house';

	async function handleSignIn() {
		await signIn.social({ provider: 'google', callbackURL: '/' });
	}

	const items = [
		{
			title: 'Home',
			url: '/',
			icon: House
		},
		{
			title: 'Products',
			url: '/products',
			icon: Apple
		},
		{
			title: 'Activities',
			url: '/activities',
			icon: Flame
		},
		{
			title: 'Footprint',
			url: '/footprint',
			icon: Footprints
		},
		{
			title: 'Leaderboard',
			url: '/leaderboard',
			icon: Medal
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content class="bg-background">
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer class="bg-background">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<ModeToggle />
			</Sidebar.MenuItem>
			<Sidebar.MenuItem>
				{#if $page.data.user}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton
									{...props}
									class="py-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar.Root>
										<Avatar.Image
											src={$page.data.user.image}
											alt="@shadcn"
											referrerpolicy="no-referrer"
										/>
										<Avatar.Fallback>CN</Avatar.Fallback>
									</Avatar.Root>
									{$page.data.user.name}

									<ChevronUp class="ml-auto" />
								</Sidebar.MenuButton>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
							<DropdownMenu.Item>
								<span>Account</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item onclick={() => signOut()}>
								<span>Sign out</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button class="w-full" variant="outline" onclick={handleSignIn}>Sign In</Button>
				{/if}
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
