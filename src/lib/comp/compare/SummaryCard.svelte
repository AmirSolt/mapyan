<script lang="ts">
	export let product: Product;
	import StarRating from '$lib/comp/general/product/StarRating.svelte';
	import { PriceFeatures } from '$lib/utils/config';
	import { cleanSellers } from '$lib/funcs/seller/index';
	import { ExternalLink } from 'lucide-svelte';

	function truncate(text: string, size: number, trailing: string = ' ...') {
		let subs = text.substring(0, size);
		if (subs.length < text.length) {
			subs += trailing;
		}
		return subs;
	}
</script>

{#if product.title && product.image_url}
	<div
		id="product_card"
		class=" flex flex-row sm:flex-col card drop-shadow-md !bg-transparent rounded-lg p-2 sm:p-4"
	>
		<!-- Media -->
		<header class="flex justify-center items-center">
			<div
				class="flex justify-center items-center w-20 h-24 sm:w-60 sm:h-64 p-2 sm:p-4 rounded-lg bg-white shadow-gray-800/90"
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
					<p class="text-sm">{truncate(product.title, 30)}</p>
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
		</div>

		<div class="flex flex-col justify-center items-start gap-2 p-2">
			<!-- Sellers -->
			{#if product.sellers}
				{#each cleanSellers(product, product.sellers) as seller}
					{#if seller.url}
						<a
							class="card variant-filled-primary flex flex-row justify-between items-center gap-2 w-32 sm:w-1/2 px-2 p-1"
							href={seller.url}
							target="_blank"
							rel="noopener"
						>
							<div class="flex flex-row justify-center items-center gap-1">
								{#if seller.name}
									<p class="text-sm">{truncate(seller.name, 8, '..')}</p>
								{/if}
								{#if seller.price}
									<p class="text-md">≈{PriceFeatures.symbol}{seller.price}</p>
								{/if}
							</div>
                            <ExternalLink />
						</a>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
{/if}
