<script>
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
        <tr>
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
</style>
