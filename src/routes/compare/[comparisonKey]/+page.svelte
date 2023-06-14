<script lang="ts">
	import OptionFeatures from '$lib/comp/compare/OptionFeatures.svelte';
	import SummaryCards from '$lib/comp/compare/SummaryCards.svelte';
	import ComparisonGrid from '$lib/comp/compare/ComparisonGrid.svelte';
    import {toastError} from '$lib/utils/toast'


	export let data;
	let { products } = data;

	// Need ProductInfo to generate features
	if (!products) {
		const message = 'Sorry, could not get the results!';
        toastError(message)
	}


	let features:string[] = [];


	// ================== Feature Options Callback ==================
    function featuresSubmitCallback(event:any){
        const selectedFeatures = event.detail.selectedFeatures;
        features = selectedFeatures
    }

</script>





{#if features.length <= 0}

	<OptionFeatures products={products??[]} on:submit={featuresSubmitCallback} />

{:else}
	<br>
	<SummaryCards products={products??[]} />
	<br>
	<ComparisonGrid {features}  products={products??[]} />

{/if}