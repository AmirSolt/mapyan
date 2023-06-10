<script lang="ts">
    import { X } from 'lucide-svelte';
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
	import { selectedProducts, removeCompareProduct } from '$lib/utils/stores';

    export let index:number = 0

</script>




{#if index < $selectedProducts.length}
	<button
		id="compare-button"
		class="relative m-2 md:m-4"
		on:click={() => removeCompareProduct($selectedProducts[index])}
	>
		<!-- <img class="max-w-full max-h-full rounded-lg" src="{product.image}" alt="Thumbnail"> -->
		<ProductAvatar imageUrl={$selectedProducts[index].image_url} size={'w-16 h-16 md:w-24 md:h-24'} />
		<div class="absolute z-10 right-0 top-0 variant-filled rounded-full drop-shadow-2xl">
			<span>
				<X />
			</span>
		</div>
	</button>
{:else}
	<button class="btn m-2 md:m-4 variant-ringed rounded-lg w-16 h-16 md:w-24 md:h-24" disabled>
		-
	</button>
{/if}
