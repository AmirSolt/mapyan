<script lang="ts">
	export let tableData: { [key: string]: Product } = {};

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
					<th class="">Product</th>
					<th class="">Title</th>
					<th class="">Brand</th>
					<th class="">Ratings</th>
					<th class="">Price</th>
				</tr>
			</thead>
		<tbody>
			{#each Object.values(tableData) as colData}
				{#if 
					colData &&
					colData.url &&
					colData.title &&
					colData.image_url
					}
				<tr>
						<td class="text-center">
							<a class="flex justify-center items-center text-center" href={colData.url} target="_blank" rel="noopener">
								<ProductAvatar imageUrl={colData.image_url} size={'w-24 h-24 md:w-32 md:h-32'} />
							</a>
						</td>
						<td class="text-center">
							<a class="flex justify-center items-center text-center" href={colData.url} target="_blank" rel="noopener">
								<span>
									{truncate(colData.title, 25)}
								</span>
							</a>
						</td>
						<td class="text-center">
							<div class="">
								<span>
									{colData.brand}
								</span>
							</div>
						</td>
						<td class="text-center">
							<div class="row flex flex-col justify-center items-center">
								<StarRating rating={colData.rating} starSize={4} />
							</div>
						</td>
						<td class="text-center">
							<div class="">
								<span>
									{PriceFeatures.symbol}{colData.price}
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
