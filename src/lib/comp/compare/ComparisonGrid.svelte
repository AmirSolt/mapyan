<script lang="ts">
    import {toastError} from '$lib/utils/toast'

    export let comparison:Comparison;
    export let products:Product[];
    export let productInfos:ProductInfo[];

    // Need ProductInfo to generate features
	if (!comparison.body && !productInfos) {
		const message = 'Could not find products!';
        toastError(message)
	}

    // async request for features from comparer


</script>

<!-- on awaiting loading -->