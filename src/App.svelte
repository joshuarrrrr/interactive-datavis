<script>
  import stations from "./assets/stations.geo.json";
  import csv from "./assets/data.csv?raw";

  import { selected } from "./lib/stores/stations";
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import TemperatureChart from "./lib/TemperatureChart.svelte";

  import * as d3 from "d3";

  const numMonths = 4;

  $: stationsData = d3.csvParse(csv, (d) => ({
    id: d.station_id,
    date: new Date(d.date),
    temperature_air_min_200: +d.temperature_air_min_200,
    temperature_air_mean_200: +d.temperature_air_mean_200,
    temperature_air_max_200: +d.temperature_air_max_200,
  }));

  $: dateDomain = d3.extent(stationsData, (d) => d.date);

  function getStationTimeSeries(id) {
    const minDate = d3.timeMonth.offset(dateDomain[1], -numMonths);
    return stationsData.filter((d) => d.id === id && d.date > minDate);
  }
</script>

<main class="flex flex-row w-screen h-screen gap-2 bg-slate-900">
  <div class="h-full grow">
    <StationsMap {stations} />
  </div>
  <div class="flex flex-col w-3/5 text-white">
    <StationsTable stations={stations.features.map((feat) => feat.properties)} />
    {#if $selected}
      <TemperatureChart data={getStationTimeSeries($selected)} />
    {/if}
  </div>
</main>
