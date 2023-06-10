<script lang="ts">
	import OptionFeatures from '$lib/comp/compare/OptionFeatures.svelte';
	import CompareTable from '$lib/comp/compare/CompareTable.svelte';
	import ComparisonGrid from '$lib/comp/compare/ComparisonGrid.svelte';
    import {toastError} from '$lib/utils/toast'


	export let data;
	let { comparisonKey, comparison, products, productInfos } = data;

	// Need ProductInfo to generate features
	if (!comparison || !products) {
		const message = 'Sorry, could not get the results!';
        toastError(message)
	}

</script>


{#if !comparison?.features}

	<OptionFeatures products={products??[]} {productInfos} />

{:else}

	<CompareTable products={products??[]} />
	<ComparisonGrid {comparison} products={products??[]} productInfos={productInfos??[]} />


{/if}