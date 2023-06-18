<script lang="ts">
	export let product: Product;
	import StarRating from '$lib/comp/general/product/StarRating.svelte';
	import { cleanSellers } from '$lib/funcs/seller/index';
	import {truncate} from "$lib/utils/funcs"
	import SellerButton from './SellerButton.svelte';
	
</script>

{#if product.title && product.image_url}
	<div
		id="product_card"
		class=" flex flex-row sm:flex-col card drop-shadow-md !bg-transparent rounded-lg p-2 sm:p-4"
	>
		<!-- Media -->
		<header class="flex justify-center items-start">
			<div
				class="flex justify-center items-center w-28 h-32 sm:w-56 sm:h-60 p-2 sm:p-4 rounded-lg bg-white shadow-gray-800/90"
			>
				<img class="max-w-full max-h-full" src={product.image_url} alt="Thumbnail" loading="lazy" />
			</div>
		</header>

		<div id="info" class="flex justify-center items-start flex-col gap-1 ps-4 sm:p-2">
			<div class="flex flex-col justify-center items-start">
				<!-- brand -->
				<div class="text-sm">
					{#if product.brand}
						<small>{product.brand}</small>
					{/if}
				</div>

				<!-- Title -->
				<div class="text-start">
					<p class="text-md">{truncate(product.title, 60)}</p>
				</div>
			</div>

			<div class="flex flex-row justify-center items-start gap-1">
				<div class="flex flex-col justify-center items-start gap-1">
					<!-- Ratings -->
					<div id="review" class="flex flex-col justify-center items-start">
						{#if product.rating && typeof product.rating == 'number'}
							<StarRating rating={product.rating} size="w-4 h-4" textSize="text-xs" />
						{/if}
						{#if product.rating_total && typeof product.rating_total == 'number'}
							<small class="mx-2 text-xs">({product.rating_total})</small>
						{/if}
					</div>

					<!-- Prices -->
					<!-- <div id="price" class="flex flex-col justify-center items-start">
                        {#if product.cheapest_price && typeof product.rating == 'number'}
                            <span class="text-xl">
                                ≈{PriceFeatures.symbol}{product.cheapest_price}
                            </span>
                        {/if}
                    </div> -->
				</div>
			</div>



			<!-- Sellers -->
			<div class="flex flex-col justify-center items-start gap-2 p-1">
				{#if product.sellers}
					{#each cleanSellers(product, product.sellers) as seller}
						{#if seller.url}
							<SellerButton {seller}/>
						{/if}
					{/each}
				{/if}
			</div>
		</div>

	</div>
{/if}
