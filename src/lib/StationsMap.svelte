<script>
  import * as d3 from "d3";
  import germany from "../assets/germany.geo.json";
  import { selected } from "./stores/stations";

  export let padding = 20;
  export let stations;
  let width = 0;
  let height = 0;
  let focus = null;

  $: projection = d3.geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    focus !== null ? focus : germany
  );
  $: path = d3.geoPath(projection);
</script>

<div id="container" class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full" on:click={() => (focus = null)}>
    {#each germany.features as feature (feature.properties.id)}
      {@const { id, name } = feature.properties}
      <path
        class="state"
        d={path(feature)}
        on:click|stopPropagation={() => {
          focus = focus && focus.properties.id === id ? null : feature;
        }}
      >
        <title>{name}</title>
      </path>
    {/each}
    {#each stations.features as station (station.properties.id)}
      {@const { id, name } = station.properties}
      {@const [cx, cy] = projection(station.geometry.coordinates)}
      <circle
        class="station"
        class:selected={$selected === id}
        {cx}
        {cy}
        on:click={() => selected.set($selected === id ? null : id)}
      >
        <title>{name}</title>
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

  circle.station.selected {
    fill: theme("colors.red.500");
    r: 0.4rem;
  }

  circle.station:hover {
    r: 0.4rem;
  }
</style>
