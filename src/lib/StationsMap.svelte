<script>
  import * as d3 from "d3";
  import germany from "../assets/germany.geo.json";
  import { active, multiToggle, selected, toggle } from "./stores/stations";

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

  function selectState(state) {
    const ids = stations.features
          .filter((station) => station.properties.state === state)
          .map((station) => station.properties.id);
    multiToggle(new Set(ids));
  }
</script>

<div id="container" class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full">
    {#each germany.features as state (state.properties.id)}
      {@const { name } = state.properties}
      <path class="state" d={path(state)} on:click={() => selectState(name)}>
        <title>{name}</title>
      </path>
    {/each}
    {#each stations.features as station (station.properties.id)}
      {@const { id, name } = station.properties}
      {@const [cx, cy] = projection(station.geometry.coordinates)}
      <circle
        class="station"
        class:active={$active === id}
        class:selected={$selected.has(id)}
        {cx}
        {cy}
        on:pointerenter={() => active.set(id)}
        on:pointerleave={() => active.set(null)}
        on:click={() => toggle(id)}
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

  circle.station.active {
    fill: theme("colors.amber.500");
    r: 0.4rem;
  }

  circle.station:hover {
    r: 0.4rem;
  }
</style>
