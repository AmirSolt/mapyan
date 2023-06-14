<script lang="ts">
    import {toastError} from '$lib/utils/toast'
	import { error } from '@sveltejs/kit';
    import {onMount} from 'svelte'
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
    import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
    import {comparisonResponseParser} from '$lib/funcs/responseParser/index'
	import {createComparisonStream} from '$lib/funcs/comparer/index'
    import {structComparisonKey} from '$lib/utils/keyMaker'
    export let comparison:Comparison;
    export let products:Product[];

    let comparisonBody = comparison.body;
    let comparisonCards:ComparisonCard[]=[];
    let isStreaming = comparisonBody.length===0;


    $:  comparisonCards = comparisonResponseParser(comparisonBody)


    // ==========================================================

    function scrollIntoView() {
        const el = document.querySelector("#loading-container");
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth'
        });
    }


    function getProductByKey(key:string):Product|null{
        let r:Product[] = products.filter(product=>key===product.key)
        if(r.length>0)
            return r[0]
        return null
    }

    function saveComparison(){

        const productKeys = products.map(product=>product.key)
        comparison.key = structComparisonKey(productKeys);
        comparison.body = comparisonBody;

        const response = fetch('/api/db/save-comparison', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            comparison
            })
        });
    }

    // ==========================================================
    function newContentCallback(newContent:string){
        comparisonBody += newContent;
        isStreaming = true;
    }
    function overCallback(){
        saveComparison();
        isStreaming=false
    }
    function errorCallback<T>(err: T){
        throw error(400, "Something went wrong!")
    }
    onMount(()=>{
        if(comparisonBody.length===0){
            const eventSource = createComparisonStream(products??[], comparison.features,newContentCallback, overCallback, errorCallback)
            if(eventSource){
                eventSource.stream()
            }
        }

        if(isStreaming)
            scrollIntoView();

    })
    // ==========================================================




</script>

<!-- on awaiting loading -->

<h1 class="text-3xl mb-4">Comparison:</h1>

<div class="flex flex-col justify-center items-center gap-4">

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
            <div class="card p-2 mt-4 variant-filled-surface">
                <p class="text-lg" ><b>Why:</b> {card.reason}</p>
            </div>
        </div>
    
    {/each}


    {#if isStreaming}
        <div id="loading-container" class="flex flex-col justify-center items-start card variant-soft gap-4 p-4 w-full">

            <div class="w-full">

                <LoadingAnim />
            </div>
        </div>

    {/if}

</div>

