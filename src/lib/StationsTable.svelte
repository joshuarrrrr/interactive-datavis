<script>
  import { selected } from "./stores/stations";

  export let stations;
</script>

<div>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>height</th>
        <th>state</th>
      </tr>
    </thead>
    <tbody>
      {#each stations as station (station.id)}
        {@const { id, name, height, state } = station}
        <tr
          class:selected={$selected === id}
          on:click={() => selected.set($selected === id ? null : id)}
        >
          <td>{id}</td>
          <td>{name}</td>
          <td class="text-right">{height}</td>
          <td>{state}</td>
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

  table thead,
  table tfoot {
    position: sticky;
    @apply bg-slate-800;
  }

  table thead {
    inset-block-start: 0;
  }

  table tfoot {
    inset-block-end: 0;
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
