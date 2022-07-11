<script>
  import stations from "./assets/stations.geo.json";
  import csv from "./assets/data.csv?raw";

  import { selected } from "./lib/stores/stations";
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import TemperatureChart from "./lib/TemperatureChart.svelte";

  import * as d3 from "d3";

  $: stationsData = d3.csvParse(csv, (d) => ({
    id: d.station_id,
    date: new Date(d.date),
    temperature_air_min_200: +d.temperature_air_min_200,
    temperature_air_mean_200: +d.temperature_air_mean_200,
    temperature_air_max_200: +d.temperature_air_max_200,
  }));

  $: temperatureDomain = [
    d3.min(stationsData, (d) => d.temperature_air_min_200),
    d3.max(stationsData, (d) => d.temperature_air_max_200),
  ];

  function getStationTimeSeries(id) {
    return stationsData.filter((d) => d.id === id);
  }
</script>

<main class="flex flex-row w-screen h-screen gap-2 bg-slate-900">
  <div class="h-full grow">
    <StationsMap {stations} />
  </div>
  <div class="flex flex-col w-3/5 text-white">
    <StationsTable stations={stations.features.map((feat) => feat.properties)} />
    {#if $selected}
      <TemperatureChart data={getStationTimeSeries($selected)} domain={temperatureDomain} />
    {/if}
  </div>
</main>
