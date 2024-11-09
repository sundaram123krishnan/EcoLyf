<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button onclick={toggleMode} variant="outline" class="w-full gap-2">
	{#if $mode === 'light'}
		<Sun />
	{:else}
		<Moon />
	{/if}

	<span>Toggle theme</span>
</Button>
