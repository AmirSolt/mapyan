<script lang="ts">
	import OptionFeatures from '$lib/comp/compare/OptionFeatures.svelte';
	import CompareTable from '$lib/comp/compare/CompareTable.svelte';
	import ComparisonGrid from '$lib/comp/compare/ComparisonGrid.svelte';


	export let data;
	let { comparisonKey, comparison, products, productInfos } = data;

</script>


{#if !comparison.features}

	<OptionFeatures {products} {productInfos} />

{:else}

	<CompareTable products={products} />
	<ComparisonGrid {comparison} {products} productInfos={productInfos??[]} />


{/if}