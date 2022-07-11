<script>
  import * as d3 from "d3";
  import { selected } from "./stores/stations";
  import { states } from "./states";
  import { timeSeries, timeRange } from "./stores/timeSeries";
  import Sparkline from "./Sparkline.svelte";

  export let stations;
  const stateAbbrevs = new Map(states.map(({ name, short }) => [name, short]));

  const sparklineDays = 14;
  $: sparklineStartDate = d3.timeDay.offset($timeRange[1] || new Date(), -sparklineDays);

  function jumpToElement(id) {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }

  $: jumpToElement($selected);
</script>

<div class="min-w-fit h-full overflow-y-scroll">
  <table class="w-full h-full">
    <thead>
      <tr>
        <th>name</th>
        <th>temperature</th>
        <th>height</th>
        <th>state</th>
      </tr>
    </thead>
    <tbody>
      {#each stations as station (station.id)}
        {@const { id, name, height, state } = station}
        <tr
          {id}
          class:selected={$selected === id}
          on:click={() => selected.set($selected === id ? null : id)}
        >
          <td>{name}</td>
          <td>
            {#if $timeSeries.has(id)}
              <Sparkline
                data={$timeSeries
                  .get(id)
                  .filter((d) => d.date >= sparklineStartDate)
                  .map((d) => ({ date: d.date, value: d.temperature_air_mean_200 }))}
                color="white"
              />
            {/if}
          </td>
          <td class="text-right">{height}</td>
          <td><abbr title={state}>{stateAbbrevs.get(state)}</abbr></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  table {
    @apply text-slate-100;
  }

  th,
  td {
    @apply p-1 select-none;
  }

  table thead {
    position: sticky;
    inset-block-start: 0;
    @apply bg-slate-800;
  }

  table thead th {
    @apply text-left font-semibold;
  }

  table tbody tr:nth-child(odd) {
    @apply bg-slate-600;
  }

  table tbody tr:nth-child(even) {
    @apply bg-slate-700;
  }

  tr.selected td {
    @apply bg-red-500 text-white;
  }
</style>
