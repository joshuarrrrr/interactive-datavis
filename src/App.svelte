<script>
  import stations from "./assets/stations.geo.json";
  import csv from "./assets/data.csv?raw";

  import { selected } from "./lib/stores/stations";
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import TemperatureChart from "./lib/TemperatureChart.svelte";

  import * as d3 from "d3";

  $: stationsData = d3.csvParse(csv, (row) => ({
    id: row.station_id,
    date: new Date(row.date + "T00:00"),
    temperature_air_min_200: Number.parseFloat(row.temperature_air_min_200),
    temperature_air_mean_200: Number.parseFloat(row.temperature_air_mean_200),
    temperature_air_max_200: Number.parseFloat(row.temperature_air_max_200),
  }));

  const numMonths = 4;
  $: dateEnd = d3.max(stationsData, (d) => d.date);
  $: dateStart = d3.timeMonth.offset(dateEnd, -numMonths);

  function getStationTimeSeries(id, attributes) {
    if (!attributes) return [];
    return stationsData
      .filter((d) => d.id === id && d.date >= dateStart)
      .filter((d) => !attributes.every((attribute) => isNaN(d[attribute])));
  }
</script>

<main class="flex flex-row w-screen h-screen bg-slate-900">
  <div class="h-full grow">
    <StationsMap {stations} />
  </div>
  <div class="flex flex-col flex-initial w-3/5 text-white">
    <StationsTable stations={stations.features.map((feat) => feat.properties)} />
    {#if $selected}
      <TemperatureChart
        data={getStationTimeSeries($selected, [
          "temperature_air_min_200",
          "temperature_air_mean_200",
          "temperature_air_max_200",
        ])}
      />
    {/if}
  </div>
</main>
