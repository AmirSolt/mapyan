<script lang="ts">
    import { ProgressBar } from '@skeletonlabs/skeleton';

    export let progressValue:number=0;

</script>


<div class="variant-soft rounded-lg">
    <ProgressBar rounded="rounded-t-lg" class="rounded-none" meter="bg-primary-500" height="h-2" value={progressValue} />
</div>