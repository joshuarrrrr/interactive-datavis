<script>
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import stations from "./assets/stations.geo.json";
  import csv from "./assets/data.csv?raw";
  import * as d3 from "d3";

  $: data = d3.csvParse(csv, d3.autoType);
</script>

<main class="flex flex-row w-screen h-screen gap-2 bg-slate-900">
  <div class="h-full grow">
    <StationsMap {stations} />
  </div>
  <div class="bg-slate-700 h- min-w-fit text-white overflow-y-scroll">
    <StationsTable stations={stations.features.map((feat) => feat.properties)} />
  </div>
</main>
