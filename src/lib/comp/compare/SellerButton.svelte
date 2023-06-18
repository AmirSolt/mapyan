<script lang="ts">
    import { PriceFeatures } from '$lib/utils/config';
	import { ExternalLink } from 'lucide-svelte';
	import {truncate} from "$lib/utils/funcs"


	export let seller: Seller;

</script>

{#if seller}
	<a
		class="card variant-filled-primary flex flex-row justify-between items-center gap-2 w-full px-2 p-1"
		href={seller.url}
		target="_blank"
		rel="noopener"
	>
		<div class="flex flex-row justify-between items-center gap-1 w-full">
            <div class="flex flex-row justify-start items-center gap-1 w-full">
                {#if seller.name}
                    <p class="text-sm">{truncate(seller.name, 8, '..')}</p>
                {/if}
                {#if seller.price}
                    <p class="text-md">≈{PriceFeatures.symbol}{seller.price}</p>
                {/if}
            </div>
            <ExternalLink />
		</div>
	</a>
{/if}
