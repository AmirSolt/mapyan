<script lang="ts">
    import {ExternalLink} from 'lucide-svelte'
    import {getDefaultSponsoredSeller} from '$lib/funcs/seller/index'
    
    
    export let product:Product;

    let seller:Seller|null = getDefaultSponsoredSeller(product)
</script>


{#if seller}

    <a class="card variant-ringed flex flex-row justify-between border-dashed items-center gap-2 px-2 p-1" href="{seller.url}" target="_blank" rel="noopener" >
        <div class="flex flex-row justify-center items-center">
            {#if seller.name}
            <p class="text-md ">  {seller.name} </p>
            {/if}
        </div>
        <ExternalLink />
    </a>

{/if}