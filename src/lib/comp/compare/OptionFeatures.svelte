<script lang="ts">
    import {toastError} from '$lib/utils/toast'

    export let products:Product[];
    export let productInfos:ProductInfo[] | null = null;


    // Need ProductInfo to generate features
	if (!productInfos) {
		const message = 'Could not find products!';
        toastError(message)
	}


    // async request for features from comparer

</script>


<!-- on awaiting loading -->
