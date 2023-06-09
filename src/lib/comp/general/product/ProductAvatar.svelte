<script lang='ts'>


    export let imageUrl:string = "";
    export let size:string = "w-32 h-32 md:w-28 md:h-28";
</script>



<div class="flex justify-center items-center m-0 p-1 {size} rounded-lg bg-white">
    <img  class="max-w-full max-h-full rounded-lg" src={imageUrl} alt="Product Avatar">
</div>
