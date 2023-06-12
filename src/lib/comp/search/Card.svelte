<script lang="ts">
	export let product: Product;
	import StarRating from '$lib/comp/general/product/StarRating.svelte';
	import { selectedProducts } from '$lib/utils/stores';
	import { PriceFeatures } from '$lib/utils/config';
	import { Check } from 'lucide-svelte';

	$: thisInSelecteds = $selectedProducts.find((item) => item.key === product.key);

	// === call back on add ===
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onAdd() {
		dispatch('add', {
			product
		});
	}

	function truncate(text: string, size: number) {
		return text.substring(0, size) + ' ...';
	}
</script>

{#if product.title && product.image_url}
	<div
		id="product_card"
		class=" flex flex-row sm:flex-col   card drop-shadow-md !bg-transparent rounded-lg p-2 sm:p-4"
	>
		<!-- Media -->
		<header class="flex justify-center items-center">
			<button on:click={onAdd}>
				<div
					class="flex justify-center items-center w-40 h-44 sm:w-60 sm:h-64 p-2 sm:p-4 rounded-lg bg-white shadow-gray-800/90"
				>
                    {#if thisInSelecteds}
                        <div class="absolute top-0 left-0 variant-filled-primary rounded-full p-2">
                            <Check color="white" />
                        </div>
                    {/if}

					<img
						class="max-w-full max-h-full"
						src={product.image_url}
						alt="Thumbnail"
						loading="lazy"
					/>
				</div>
			</button>
		</header>

		<div id="info" class="flex justify-center items-start flex-col gap-1 ps-4">

            <div class="flex flex-col justify-center items-start">
                <!-- brand -->
                <div >
                    {#if product.brand}
                        <small>{product.brand}</small>
                    {/if}
                </div>
    
                <!-- Title -->
                <div class="text-start">
                    <p>{truncate(product.title, 60)}</p>
                </div>
            </div>


            <div class="flex flex-col justify-center items-start">
                <!-- Ratings -->
                <div id="review" class="flex flex-col justify-center items-start">
                    {#if product.rating && typeof product.rating == 'number'}
                        <StarRating rating={product.rating} />
                    {/if}
                    {#if product.rating_total && typeof product.rating_total == 'number'}
                        <small class="mx-2">({product.rating_total})</small>
                    {/if}
                </div>
    
                <!-- Prices -->
                <div id="price" class="flex flex-col justify-center items-start">
                    {#if product.cheapest_price && typeof product.rating == 'number'}
                        <span class="text-2xl">
                            ≈{PriceFeatures.symbol}{product.cheapest_price}
                        </span>
                    {/if}
                </div>

            </div>
		</div>

	</div>
{/if}
