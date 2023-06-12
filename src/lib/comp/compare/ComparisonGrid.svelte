<script lang="ts">
    import {toastError} from '$lib/utils/toast'
	import { error } from '@sveltejs/kit';
    import {onMount} from 'svelte'
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
        
    import {comparisonResponseParser} from '$lib/funcs/responseParser/index'
	import {createComparisonStream} from '$lib/funcs/comparer/index'
    
    export let comparison:Comparison;
    export let products:Product[];

    let comparisonBody = comparison.body;
    let isStreaming = false;
    let comparisonCards:ComparisonCard[]=[];




    // ==========================================================


    function getProductByKey(key:string):Product|null{
        let r:Product[] = products.filter(product=>key===product.key)
        if(r.length>0)
            return r[0]
        return null
    }

    // ==========================================================
    function newContentCallback(newContent:string){
        comparisonBody += newContent;
        isStreaming = true;
    }
    function overCallback(){
        isStreaming=false
    }
    function errorCallback<T>(err: T){
        throw error(400, "Something went wrong!")
    }
    onMount(()=>{
        if(comparisonBody.length===0){
            // const eventSource = createComparisonStream(products??[], comparison.features,newContentCallback, overCallback, errorCallback)
            // if(eventSource){
            //     eventSource.stream()
            // }
        }
    })
    // ==========================================================



    $:  comparisonCards = comparisonResponseParser(comparisonBody)

</script>

<!-- on awaiting loading -->

<h1 class="text-3xl mb-4">Comparison:</h1>


{#each comparisonCards as card}

    <div class="flex flex-col justify-center items-start card variant-soft gap-4 p-4 w-full">
        <h1 class="text-2xl md:text-4xl  md:ms-4 my-4">{card.feature}:</h1>

        <!-- -------Rankings--------- -->
        <div class="flex flex-row justify-center items-start w-full gap-3 ">
            {#each card.keys as key, index}
            <div class="flex flex-row justify-center items-start gap-1">
                    <h1>{index+1}.</h1>
                    <ProductAvatar
                        imageUrl={getProductByKey(key)?.image_url}
                        size={'w-20 h-20 sm:w-32 sm:h-32'}
                    />
                </div>
            {/each}
        </div>


        <p>Why: {card.reason}</p>
    </div>

{/each}
