<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
	import SideBar from './SideBar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

{@render children?.()}
