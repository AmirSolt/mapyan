<script lang="ts">
	export let products: Product[];

	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	import StarRating from '$lib/comp/general/product/StarRating.svelte';
	import {PriceFeatures} from '$lib/utils/config'
	function truncate(text: string, size: number) {
		return text.substring(0, size) + ' ...';
	}
</script>

<div class="table-container">
	<table class="table table-hover table-compact table-auto ">
			<thead>
				<tr>
					<th class="text-center">Product</th>
					<th class="text-center">Title</th>
					<th class="text-center">Brand</th>
					<th class="text-center">Ratings</th>
					<th class="text-center">Price</th>
				</tr>
			</thead>
		<tbody>
			{#each products as product}
				{#if 
					product &&
					product.url &&
					product.title &&
					product.image_url
					}
				<tr>
						<td class="text-center">
							<a class="flex justify-center items-center" href={product.url} target="_blank" rel="noopener">
								<ProductAvatar imageUrl={product.image_url} size={'w-24 h-24 md:w-32 md:h-32'} />
							</a>
						</td>
						<td class="text-center">
							<a class="" href={product.url} target="_blank" rel="noopener">
								<span>
									{truncate(product.title, 25)}
								</span>
							</a>
						</td>
						<td class="text-center">
							<div class="">
								<span>
									{product.brand}
								</span>
							</div>
						</td>
						<td class="text-center">
							<div class="">
								<StarRating rating={product.rating} starSize={5} />
							</div>
						</td>
						<td class="text-center">
							<div class="">
								<span>
									{PriceFeatures.symbol}{product.price}
								</span>
							</div>
						</td>
				</tr>
				{/if}
			{/each}
		</tbody>

		<!-- <ProductRows {tableData} /> -->
	</table>
</div>

<style>
</style>
