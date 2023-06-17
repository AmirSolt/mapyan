<script lang="ts">
    import {toastError} from '$lib/utils/toast'
	import { error } from '@sveltejs/kit';
    import {onMount} from 'svelte'
    import {Medal} from 'lucide-svelte'
	import ProductAvatar from '$lib/comp/general/product/ProductAvatar.svelte';
    import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
    import {comparisonResponseParser} from '$lib/funcs/responseParser/index'
	import {createComparisonStream} from '$lib/funcs/comparer/index'
    export let features:string[];
    export let products:Product[];

    let comparisonBody:string="";
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
    scrollIntoView();


    function getProductByKey(key:string):Product|null{
        let r:Product[] = products.filter(product=>key===product.key)
        if(r.length>0)
            return r[0]
        return null
    }
    function truncate(text: string, size: number, trailing:string="..") {
		return text.substring(0, size) + trailing;
	}
 
    // ==========================================================
    function newContentCallback(newContent:string){
        comparisonBody += newContent;
        isStreaming = true;
    }
    function overCallback(){
        isStreaming=false
        console.log(comparisonBody)
    }
    function errorCallback<T>(err: T){
        throw error(400, "Something went wrong!")
    }
    onMount(()=>{
        if(comparisonBody.length===0){
            const eventSource = createComparisonStream(products??[], features,newContentCallback, overCallback, errorCallback)
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
        <div class="flex flex-col justify-center items-start card variant-soft gap-4 p-4 py-8 w-full">
    
            <!-- -------Feature--------- -->
            <h1 class="text-2xl md:text-4xl  md:ms-4 my-4">{card.feature}:</h1>
    
            <!-- -------Rankings--------- -->
            <div class="flex flex-row justify-center items-end w-full gap-3 ">
                {#each card.keys as key, index}

                <!-- -------ProductAvatar--------- -->
                    <div class="flex flex-col justify-center items-start gap-1">
                        <div class="relative flex flex-row justify-center items-start gap-1">
                            {#if index===0}
                                <div class="absolute top-0 left-5">
                                    <Medal fill="gold" />
                                </div>
                            {/if}
                            <h1>{index+1}.</h1>
                            <ProductAvatar
                                imageUrl={getProductByKey(key)?.image_url}
                                size={index===0?'w-24 h-24 sm:w-40 sm:h-40':'w-20 h-20 sm:w-32 sm:h-32'}
                            />
                        </div>

                        <div class="w-full">
                            <p class="text-center text-sm">{truncate(getProductByKey(key)?.title??"", 10)}</p>
                        </div>

                    </div>
                {/each}
            </div>

            <!-- -------Reason--------- -->
            <div class="card p-4 py-8 mt-4 ">
                <p class="text-lg text-black dark:text-white " ><b>Why:</b> {card.reason}</p>
            </div>
        </div>
    
    {/each}


    <!-- -------Loading--------- -->
    {#if isStreaming}
        <div id="loading-container" class="flex flex-col justify-center items-start card variant-soft gap-4 p-4 w-full">

            <div class="w-full">

                <LoadingAnim />
            </div>
        </div>

    {/if}

</div>

