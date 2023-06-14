
<script lang="ts">

	import LoadingAnim from '$lib/comp/general/loading/LoadingAnim.svelte';
	import BarLoading from '$lib/comp/general/loading/BarLoading.svelte';
	import LoadingContainer from '$lib/comp/general/loading/LoadingContainer.svelte';
	import SelectionProgressLoading from './SelectionProgressLoading.svelte';
	import SelectedProduct from './SelectedProduct.svelte';
	import { selectedProducts } from '$lib/utils/stores';
	import {goto} from '$app/navigation';
	import {toastError} from '$lib/utils/toast'
	import {structComparisonKey} from '$lib/utils/keyMaker'
	import {SelectionLimit} from "$lib/utils/config"

	$: progressValue = ($selectedProducts.length / SelectionLimit.max) * 100;
	$: barBg = $selectedProducts.length>0? 'variant-filled-surface' : '!bg-transparent'
	let compareLoading:boolean = false
	
	
	function goToCompare() {
		compareLoading = true;
		
		if($selectedProducts.length<SelectionLimit.min || $selectedProducts.length>SelectionLimit.max){
			toastError(`You atleast need to select ${SelectionLimit.min} products`, false)
			return;
		}

		const comparisonKey = structComparisonKey(getSelectedKeys());
        goto(`/compare/${comparisonKey}`)
	}

	function getSelectedKeys(){
		return $selectedProducts.map((item:Product)=>item.key)
	}


</script>



{#if compareLoading}
	<LoadingContainer >
	<LoadingAnim />
	<br>
	<BarLoading seconds={5} />
	</LoadingContainer>
{/if}



<div class={ $selectedProducts.length>0? "sticky top-0 z-10" : ""} >

	<!-- Selection progress loading -->
	<SelectionProgressLoading {progressValue} />
	
	<div class="card {barBg} p-2 md:p-4 rounded-t-none  flex flex-row justify-between items-center md:px-24">
		
		<!-- Products -->
		<div class="flex justify-center items-center h-16 md:h-20">
			{#each Array(SelectionLimit.max) as _, index}
				<SelectedProduct {index} />
			{/each}
		</div>
	
		<!-- Button -->
		<div class="w-1/4">
			{#if $selectedProducts.length > 0}
				<button class="btn variant-filled-primary w-full" on:click={goToCompare}>
					Compare	  
				</button>
			{:else}
				<button class="btn variant-ringed w-full"  disabled> - </button>
			{/if}
		</div>

	</div>
</div>


