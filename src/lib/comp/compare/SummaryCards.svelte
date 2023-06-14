
<script lang="ts">

    import Card from "./SummaryCard.svelte";

	export let products:Product[] = [];

</script>






<h1 class="text-3xl mb-4">Summary:</h1>


<span class="text-sm sm:text-center ">
	*We may receive commissions on external links
</span>

{#if products.length === 0}

<div class="flex justify-center items-center  w-full h-40">
	<h1 class="text-2xl">No products found</h1>
</div>



{:else}

	<div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		{#each products as product}
			<Card {product}  />	
		{/each}
	</div>

{/if}


