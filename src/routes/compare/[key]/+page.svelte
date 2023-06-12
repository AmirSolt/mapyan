<script lang="ts">
	import OptionFeatures from '$lib/comp/compare/OptionFeatures.svelte';
	import SummaryCards from '$lib/comp/compare/SummaryCards.svelte';
	import ComparisonGrid from '$lib/comp/compare/ComparisonGrid.svelte';
    import {toastError} from '$lib/utils/toast'


	export let data;
	let { comparisonKey, comparison, products } = data;

	// Need ProductInfo to generate features
	if (!comparison || !products) {
		const message = 'Sorry, could not get the results!';
        toastError(message)
	}


	// comparison.body=`
	// /f feature
	// /a B07D29QNMJ|B0BSL5GWFN|B097M9R9CT
	// /r reason`

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


	// ================== Feature Options Callback ==================
    function featuresSubmitCallback(event:any){
        const selectedFeatures = event.detail.selectedFeatures;
        comparison.features = selectedFeatures
    }

</script>





{#if comparison.features.length <= 0}

	<OptionFeatures products={products??[]} on:submit={featuresSubmitCallback} />

{:else}
	<br>
	<SummaryCards products={products??[]} />
	<br>
	<ComparisonGrid {comparison} products={products??[]} />


{/if}