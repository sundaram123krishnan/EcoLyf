<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import H1 from '$lib/components/ui/typography/H1.svelte';
	import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
	import { LoaderCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let scannerOpen = $state(true);
	let fetchingDetails = $state(false);
	let productData = $state<any>();

	const getNumbers = (str: string) => {
		const result = str.match(/\d+(\.\d+)?/g);
		return result ? result.map(Number) : [];
	};

	async function getProductData(barcode: string) {
		fetchingDetails = true;
		const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`);
		productData = (await response.json()).product;
		console.log(productData);
		fetchingDetails = false;
	}

	function estimateEmissions(grade: string, quantity: string) {
		if (grade === 'unknown') grade = 'c';
		grade = grade.toUpperCase();
		const numQuantity = getNumbers(quantity)[0] / 1000;
		const emissionsFactors: Record<string, number> = {
			A: 0.1, // kg CO₂e per kg for grade A
			B: 0.3, // kg CO₂e per kg for grade B
			C: 0.6, // kg CO₂e per kg for grade C
			D: 1.0, // kg CO₂e per kg for grade D
			E: 2.0 // kg CO₂e per kg for grade E
		};

		const upperGrade = grade.toUpperCase();
		const emissions = emissionsFactors[upperGrade] * numQuantity;
		return emissions;
	}

	async function submitProduct() {
		const response = await fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify({
				createdAt: new Date(),
				name: productData.product_name,
				emission: estimateEmissions(productData.ecoscore_grade.toUpperCase(), productData.quantity),
				isFood: true
			})
		});
		toast.success(await response.text());
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

<H1>Products</H1>

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
	<div class="grid grid-cols-2 gap-2">
		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Product name</Card.Title>
				<Card.Description>{productData.product_name}</Card.Description>
			</Card.Header>
		</Card.Root>

		<Card.Root class="row-span-4">
			<Card.Header class="py-6">
				<Card.Title>Image</Card.Title>
			</Card.Header>
			<Card.Content>
				<img alt="product logo" src={productData.image_url} />
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Ecoscore grade</Card.Title>
				<Card.Description>
					<img src={`/Ecoscore ${productData.ecoscore_grade.toUpperCase()}.png`} alt="ecoscore" />
				</Card.Description>
			</Card.Header>
		</Card.Root>

		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Quantity</Card.Title>
				<Card.Description>{productData.quantity}</Card.Description>
			</Card.Header>
		</Card.Root>

		<Card.Root>
			<Card.Header class="py-6">
				<Card.Title>Estimated emissions</Card.Title>
				<Card.Description>
					{estimateEmissions(productData.ecoscore_grade.toUpperCase(), productData.quantity)}
				</Card.Description>
			</Card.Header>
		</Card.Root>
	</div>

	<div class="flex w-full items-end">
		<Button class="ml-auto" onclick={submitProduct}>Add product</Button>
	</div>
{/if}
