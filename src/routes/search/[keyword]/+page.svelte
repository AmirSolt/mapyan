<script lang="ts">

    export let data;
    $: ({ searchTerm, products } = data);
    import SearchInput from '$lib/comp/search/SearchInput.svelte';
    import CardGrid from '$lib/comp/search/CardGrid.svelte';
    import {toastError} from '$lib/utils/toast'


    // Need ProductInfo to generate features
	if (!products) {
		const message = 'Sorry, could not get the results!';
        toastError(message)
	}
</script>




<SearchInput {searchTerm} />
        

<CardGrid products={products??[]} />