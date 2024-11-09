<script lang="ts">
	import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
	import { onMount } from 'svelte';
	import { LoaderCircle } from 'lucide-svelte';

	let scannerOpen = $state(true);
	let fetchingDetails = $state(false);
	let productData = $state<any>();

	async function getProductData(barcode: string) {
		fetchingDetails = true;
		const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`);
		productData = (await response.json()).product;
		console.log(productData);
		fetchingDetails = false;
	}

	onMount(async () => {
		const codeReader = new BrowserMultiFormatReader();
		codeReader.decodeFromVideoDevice(
			(await codeReader.listVideoInputDevices())[0].deviceId,
			'video',
			(result, err) => {
				if (result) {
					getProductData(result.getText());
					scannerOpen = false;
					codeReader.reset();
				}
				if (err && !(err instanceof NotFoundException)) console.error(err);
			}
		);
	});
</script>

<p>Products</p>

{#if scannerOpen}
	<video id="video">
		<track kind="captions" />
	</video>
{/if}

{#if fetchingDetails}
	<div class="flex items-center gap-2">
		<LoaderCircle class="animate-spin" />
		<span>Getting details</span>
	</div>
{/if}

{#if productData}
	{productData.product_name}
{/if}
