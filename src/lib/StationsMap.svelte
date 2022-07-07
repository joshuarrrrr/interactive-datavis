<script>
  import * as d3 from "d3";
  import germany from "../assets/germany.geo.json";

  export let padding = 20;
  export let stations;
  let width = 0;
  let height = 0;

  $: projection = d3.geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    germany
  );
  $: path = d3.geoPath(projection);
</script>

<div id="container" class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full">
    {#each germany.features as feature (feature.properties.id)}
      <path class="state" d={path(feature)}>
        <title>{feature.properties.name}</title>
      </path>
    {/each}
    {#each stations.features as station (station.properties.id)}
      {@const [cx, cy] = projection(station.geometry.coordinates)}
      <circle class="station" {cx} {cy}>
        <title>{station.properties.name}</title>
      </circle>
    {/each}
  </svg>
</div>

<style lang="postcss">
  path.state {
    fill: theme("colors.slate.600");
    stroke: theme("colors.slate.500");
  }

  path.state:hover {
    fill: theme("colors.slate.500");
  }

  circle.station {
    fill: theme("colors.slate.300");
    stroke: none;
    r: 0.2rem;
  }

  circle.station:hover {
    fill: theme("colors.green.500");
    r: 0.4rem;
  }
</style>
