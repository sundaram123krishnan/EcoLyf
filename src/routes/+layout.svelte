<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import SideBar from './SideBar.svelte';
	import { onMount } from 'svelte';
	import { Leaf, LeafyGreen } from 'lucide-svelte';

	let { children } = $props();

	const numLeaves = 15;
	let leaves = $state<any[]>([]);

	const randomizeLeaves = () => {
		leaves = Array.from({ length: numLeaves }, () => ({
			size: Math.random() * 20 + 10, // Random size between 10 and 30
			rotation: Math.random() * 360, // Random rotation
			flip: Math.random() < 0.5 ? -1 : 1, // Flip horizontally
			xPos: Math.random() * 100, // Position from left in percentage
			yPos: Math.random() * 100, // Position from top in percentage
			animationDuration: Math.random() * 10 + 5 // Random speed for animation,
		}));
	};

	onMount(() => {
		randomizeLeaves();
	});
</script>

<Toaster />
<ModeWatcher />

<div class="relative h-screen w-full">
	<div class="container absolute inset-0 -z-50">
		{#each leaves as { size, rotation, flip, xPos, yPos, animationDuration }, index}
			<div
				class="leaf"
				style="
                width: {size}px;
                height: {size}px;
                left: {xPos}%;
                top: {yPos}%;
                transform: rotate({rotation}deg) scaleX({flip});
                animation-duration: {animationDuration}s;
            "
			>
				{#if flip > 0.5}
					<Leaf class="text-primary" />
				{:else}
					<LeafyGreen class="text-primary" />
				{/if}
			</div>
		{/each}
	</div>
	<div class="absolute inset-0 flex">
		<Sidebar.Provider>
			<SideBar />
			<main class="mx-auto w-full max-w-screen-md space-y-4 bg-background bg-opacity-75 p-6">
				{@render children?.()}
			</main>
		</Sidebar.Provider>
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.leaf {
		position: absolute;
		transform-origin: center;
		animation: float 10s ease-in-out infinite;
		will-change: transform;
	}

	@keyframes float {
		0% {
			transform: translate(0, 0) rotate(0deg);
		}
		25% {
			transform: translate(10px, -10px) rotate(10deg);
		}
		50% {
			transform: translate(-10px, 10px) rotate(-10deg);
		}
		75% {
			transform: translate(10px, 10px) rotate(10deg);
		}
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
	}
</style>
