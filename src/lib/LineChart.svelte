<script>
  export let data = [];

  let width;
  let height;

  $: console.log(width, height);
</script>

<div id="container" class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full bg-slate-100" />
</div>
