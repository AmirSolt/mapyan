<script lang="ts">
    import {toastError} from '$lib/utils/toast'

    export let comparison:Comparison;
    export let products:Product[];


	import {createComparisonStream} from '$lib/funcs/comparer/index'
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
        // const eventSource = createComparisonStream(products??[], comparison.features,newContentCallback, overCallback, errorCallback)
        // if(eventSource){
        //     eventSource.stream()
        // }
    })




</script>

<!-- on awaiting loading -->

<h1>Comparison Grid</h1>


<p>
	{comparisonBody}
</p>
<p>
	{isStreaming}
</p>
