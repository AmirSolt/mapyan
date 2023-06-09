<!-- Every "ResponseCard" is made of "heading", "items"-->
<!-- items: product, paragraph -->

<script lang="ts">
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	// import StarRating from '$lib/comp/general/product/StarRating.svelte';

	export let tableData: { [key: string]: CompactProductInfo };
	export let card: CompareCard;

	function truncate(text: string, size: number) {
		return text.substring(0, size) + ' ...';
	}
</script>



<div class="card variant-soft  flex flex-col justify-center items-start gap-4 p-4 w-full">
	<h1 class="text-3xl md:text-4xl  md:ms-4 my-4">{card.heading}:</h1>

	{#each card.items as item}
		<div class="card flex flex-col md:flex-row justify-start items-start p-2 w-full ">

			

			<!-- product Image and title -->
			<div class="flex flex-col justify-center items-center inline-block p-2 ms-2 w-36  border-b-2 border-e-2 rounded-br-lg">
				{#if item && item.asin && tableData[item.asin] && tableData[item.asin].link && tableData[item.asin].image && tableData[item.asin].title}
					<a class="" href={tableData[item.asin].link} target="_blank" rel="noopener">
						<ProductAvatar
							imageUrl={tableData[item.asin].image}
							size={'w-32 h-32'}
						/>
					</a>

					<a class="" href={tableData[item.asin].link} target="_blank" rel="noopener">
						<span class="text-sm">
							{truncate(tableData[item.asin].title, 25)}
						</span>
					</a>
				{:else}
					<p class="variant-soft-error">N/A</p>
				{/if}
			</div>

			<!-- Paragraph -->
			<div class="p-4">
				{#if item && item.paragraph}
					<p>
						{item.paragraph}
					</p>
				{:else}
					<p class="variant-soft-error">Something went wrong!</p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<br />
