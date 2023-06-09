
<script lang="ts">

    import SelectionBar from "$lib/comp/selection/SelectionBar.svelte";
    import Card from "./Card.svelte";

	export let products:Product[] = [];

    import {addToSelected} from '$lib/utils/stores'




    function productCallback(event:any){
        const product = event.detail.product;
        addToSelected(product)
    }

    


</script>


<SelectionBar />



<div class="my-5 w-full">


	{#if products.length === 0}
        <h3>No products found</h3>


	{:else}

		<div class="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-3">
			{#each products as product}
				<Card {product} on:add={productCallback} />	
			{/each}
		</div>

	{/if}

</div>