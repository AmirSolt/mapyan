
<script lang="ts">
    export let product:Product; 
    import StarRating from "$lib/comp/general/product/StarRating.svelte";
    import {selectedProducts} from '$lib/utils/stores'
	import {SelectionLimit} from "$lib/utils/config"
	import {PriceFeatures} from '$lib/utils/config'


    $: thisInSelecteds = $selectedProducts.find((item) => item.key === product.key);
    $: reachedMaxSelected =  $selectedProducts.length>=SelectionLimit.max;



    // === call back on add ===
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    function onAdd() {
        dispatch('add', {
            product
        });
    }

    function truncate(text:string, size:number){
		return text.substring(0,size) + " ...";
	}
</script>



    {#if 
        product.title &&
        product.image_url &&
        product.url
        }

    <div id="product_card"  class=" flex flex-col  justify-between  card drop-shadow-md !bg-transparent rounded-lg p-2 md:p-4"> 


        <!-- Media -->
        <header class="flex justify-center items-center">
            <a href="{product.url}" id="media" target="_blank" rel="noopener">
                <div class="flex justify-center items-center w-40 h-44 md:w-72 md:h-74 p-2 md:p-4 rounded-lg bg-white shadow-gray-800/90">
                    <img class="max-w-full max-h-full" src="{product.image_url}" alt="Thumbnail" loading="lazy">
                </div>
            </a>
        </header>
        

        <div id="info" class="flex flex-col gap-1">
        
            <br>

            
            <!-- brand -->
            <div id="brand" class="row">
                {#if product.brand}
                <small>{product.brand}</small>
                {/if}
            </div>


            <!-- Title -->
            <div id="title" class="row">
                <a href="{product.url}" id="media" target="_blank" rel="noopener">
                    <p  >{truncate(product.title, 100)}</p>
                </a>    
            </div>



            <!-- Ratings -->
            {#if product.rating && 
                typeof product.rating == 'number'}
            <div id="review" class="row flex flex-col justify-center items-start">
                <StarRating rating={product.rating} />                
            </div>
            {/if}


            <!-- Prices -->
            {#if product.price}
                <div id="price" class="row">
                    <span class="text-2xl">
                        {PriceFeatures.symbol}{product.price}
                    </span>
                </div>
            {/if}

        </div>

        <footer>

            <br>

            <div class='flex justify-end items-center  w-full'>
                {#if thisInSelecteds || reachedMaxSelected}
                    <button class="btn variant-filled w-full h-10 md:w-3/4 md:h-12" disabled>
                        -
                    </button>
                {:else}
                    <button class="btn variant-filled w-full h-10 md:w-3/4 md:h-12" on:click={onAdd}>
                        + Add
                    </button>
                {/if}
            </div>


        </footer>

    </div>


    {/if}
