<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import SideBar from './SideBar.svelte';

	let { children } = $props();
</script>

<Toaster />
<ModeWatcher />

<Sidebar.Provider>
	<SideBar />
	<main class="mx-auto w-full max-w-screen-md space-y-4 p-6">
		{@render children?.()}
	</main>
</Sidebar.Provider>
