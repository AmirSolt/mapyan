<script lang="ts">
	import { toastError } from '$lib/utils/toast';

	export let products: Product[];


    
	import {createOptionFeaturesStream} from '$lib/funcs/comparer/index'
	import { error } from '@sveltejs/kit';
    import {onMount} from 'svelte'
    
	let comparisonBody = "";
    let isStreaming = false;
  

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
        // const eventSource = createOptionFeaturesStream(products??[],  newContentCallback, overCallback, errorCallback)
        // if(eventSource){
        //     eventSource.stream()
        // }
    })




</script>

<!-- on awaiting loading -->

<h1>Features</h1>


<p>
	{comparisonBody}
</p>
<p>
	{isStreaming}
</p>
