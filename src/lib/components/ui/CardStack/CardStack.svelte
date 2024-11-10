<script lang="ts">
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';

	type Card = {
		id: number;
		image: string;
		text: string;
	};

	export let items: Card[];
	export let offset: number | undefined = undefined;
	export let scaleFactor: number | undefined = undefined;

	let interval: any;
	const CARD_OFFSET = offset || 16;
	const SCALE_FACTOR = scaleFactor || 0.06;
	let cards: Card[] = items;

	onMount(() => {
		startFlipping();
	});

	const startFlipping = () => {
		interval = setInterval(() => {
			const newArray = [...cards]; // create a copy of the array
			newArray.unshift(newArray.pop()!); // move the last element to the front
			cards = newArray;
		}, 2500);

		return () => clearInterval(interval);
	};
</script>

<div class="relative h-60 w-60 md:h-60 md:w-full">
	{#each cards as card, index (card.id)}
		<Motion
			let:motion
			style={{
				transformOrigin: 'top center'
			}}
			animate={{
				top: index * -CARD_OFFSET,
				scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
				zIndex: cards.length - index //  decrease z-index for the cards that are behind
			}}
		>
			<div
				use:motion
				class="absolute flex h-60 w-60 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] dark:border-white/[0.1] dark:bg-black dark:shadow-white/[0.05] md:h-80 md:w-full"
			>
				<img src={card.image} alt="screenshot of the app" class="m-auto max-h-96 max-w-96" />
				<p class="text-center font-medium text-neutral-500 dark:text-white mt-2">
					{card.text}
				</p>
			</div>
		</Motion>
	{/each}
</div>

<style>
	.highlight {
		@apply bg-emerald-100 px-1 py-0.5 font-bold text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500;
	}
</style>
