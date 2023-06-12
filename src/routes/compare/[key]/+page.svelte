<script lang="ts">
	import OptionFeatures from '$lib/comp/compare/OptionFeatures.svelte';
	import CompareTable from '$lib/comp/compare/CompareTable.svelte';
	import ComparisonGrid from '$lib/comp/compare/ComparisonGrid.svelte';
    import {toastError} from '$lib/utils/toast'


	export let data;
	let { comparisonKey, comparison, products } = data;

	// Need ProductInfo to generate features
	if (!comparison || !products) {
		const message = 'Sorry, could not get the results!';
        toastError(message)
	}



	comparison.features = [
		" Lithium-ion battery pack ",
		"Pure sine wave AC outlet ",
		"USB-A ports ",
		"12V DC car port ",
		"Solar panel compatibility ",
		"Lightweight and portable design",
		"Battery management system ",
		"Overheating protection ",
		"Swappable U-Battery ",
		"Multiple recharging options (AC, solar, car)"
	]

</script>





{#if comparison.features.length <= 0}

	<OptionFeatures products={products??[]} />

{:else}

	<CompareTable products={products??[]} />
	<ComparisonGrid {comparison} products={products??[]} />


{/if}