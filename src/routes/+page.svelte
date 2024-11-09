<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
	import SideBar from './SideBar.svelte';
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

</script>

<Sidebar.Provider>
	<SideBar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
