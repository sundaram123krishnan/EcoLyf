<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '#',
			icon: House
		},
		{
			title: 'Products',
			url: 'products',
			icon: Calendar
		},
		{
			title: 'Activities',
			url: 'activities',
			icon: Search
		},
		{
			title: 'Footprint',
			url: 'footprint',
			icon: Settings
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
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

	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								Username
								<ChevronUp class="ml-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
						<DropdownMenu.Item>
							<span>Account</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Sign In</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Sign out</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
