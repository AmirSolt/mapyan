
<script lang="ts">

    import SelectionBar from "$lib/comp/selection/SelectionBar.svelte";
    import Card from "./Card.svelte";
	import AdCard from './AdCard.svelte';
    import {addToSelected} from '$lib/utils/stores'

	export let products:Product[] = [];





    function productCallback(event:any){
        const product = event.detail.product;
        addToSelected(product)
    }

    


</script>


<SelectionBar />



<div class="my-5 w-full">


	{#if products.length === 0}

	<div class="flex justify-center items-center  w-full h-40">
		<h1 class="text-2xl">No products found</h1>
	</div>



	{:else}

		<div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">

			<AdCard />

			{#each products as product}
				<Card {product} on:add={productCallback} />	
			{/each}
		</div>

	{/if}

</div>