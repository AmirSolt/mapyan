<script lang="ts">
	import { toastError } from '$lib/utils/toast';

	export let products: Product[];
    import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';

    import {Box} from 'lucide-svelte'
    import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
    import {featureOptionsResponseParser} from '$lib/funcs/responseParser/index'
	import {createOptionFeaturesStream} from '$lib/funcs/comparer/index'
	import { error } from '@sveltejs/kit';
    import {onMount} from 'svelte'
    
	let featuresBody:string = "";
    let features:string[]=[];
    let selectedFeatures:string[] = []
    let isStreaming:boolean = featuresBody.length===0;

  

    $: features = featureOptionsResponseParser(featuresBody)

    // ==========================================================
    function newContentCallback(newContent:string){
        featuresBody += newContent;
        isStreaming = true;
    }
    function overCallback(){
        isStreaming=false
    }
    function errorCallback<T>(err: T){
        throw error(400, "Something went wrong!")
    }


    onMount(()=>{
        const eventSource = createOptionFeaturesStream(products??[],  newContentCallback, overCallback, errorCallback)
        if(eventSource){
            eventSource.stream()
        }
    })
    // ==========================================================


    // ==========================================================
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function onSubmit() {
		dispatch('submit', {
			selectedFeatures
		});
	}

</script>

<!-- on awaiting loading -->



<div class="card w-full p-4 ">
    <h1 class="mb-6 text-4xl ">
        Choose which features to compare:
    </h1>

    <ListBox  active="variant-filled-primary" hover="variant-soft hover:variant-soft-primary" class="w-full " multiple>
        {#each features as feature}
            <ListBoxItem class="" bind:group={selectedFeatures} name="feature" value="{feature}">
                <svelte:fragment slot="lead"><Box /></svelte:fragment>
                <p class="text-xl sm:text-2xl">
                    {feature}
                </p>
            </ListBoxItem>
        {/each}
    </ListBox>
    
    <br>
    {#if isStreaming}
        <div class="flex flex-col justify-center items-start card variant-soft gap-4 p-4 w-full">

            <div class="w-full">

                <LoadingAnim />
            </div>
        </div>
    {/if}
    <br>

    
    <div class="flex flex-col justify-center items-center  w-full">
        <button type="button" class="btn variant-filled-primary w-full md:w-1/2" on:click={onSubmit} disabled='{isStreaming}'>
            <span>Submit</span>
        </button>
    </div>
    
    <br>
    <br>
</div>

<br>
<br>
<br>