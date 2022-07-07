<script>
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { active, selected, toggle, reset } from "./stores/stations";

  export let stations;

  $: allSelected = $selected.size === stations.length;
  $: noneSelected = $selected.size === 0;

  $: sortedStations = [
    ...stations.filter((station) => $selected.has(station.id)),
    ...stations.filter((station) => !$selected.has(station.id)),
  ];

  function toggleAll() {
    if (allSelected) {
      reset();
    } else {
      selected.set(new Set(stations.map((station) => station.id)));
    }
  }
</script>

<div>
  <table>
    <thead>
      <tr>
        <th
          ><input
            type="checkbox"
            checked={allSelected}
            indeterminate={!allSelected && !noneSelected}
            on:input={toggleAll}
          /></th
        >
        <th>id</th>
        <th>name</th>
        <th>height</th>
        <th>state</th>
      </tr>
    </thead>
    <tbody>
      {#each sortedStations as station (station.id)}
        <tr
          transition:slide
          animate:flip={{ duration: 200 }}
          class:active={$active === station.id}
          on:pointerenter={() => active.set(station.id)}
          on:pointerleave={() => active.set(null)}
        >
          <td
            ><input
              type="checkbox"
              checked={$selected.has(station.id)}
              on:click={() => toggle(station.id)}
            /></td
          >
          <td>{station.id}</td>
          <td>{station.name}</td>
          <td class="text-right">{station.height}</td>
          <td>{station.state}</td>
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
    @apply px-2 py-1;
  }

  table thead {
    inset-block-start: 0;
    position: sticky;
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

  tr.active td {
    @apply bg-amber-500 text-slate-900;
  }
</style>
