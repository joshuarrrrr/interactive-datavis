<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  import stations from "./assets/stations.geo.json";
  import { loadTimeSeriesData, timeSeries, timeRange } from "./lib/stores/timeSeries";

  import { selected } from "./lib/stores/stations";
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import TemperatureChart from "./lib/TemperatureChart.svelte";

  onMount(() => loadTimeSeriesData());

  const numMonths = 4;
  $: dateStart = d3.timeMonth.offset($timeRange[1] || new Date(), -numMonths);

  function getStationTimeSeries(id, attributes) {
    if (!attributes) return [];
    return $timeSeries
      .get(id)
      .filter((d) => d.date >= dateStart)
      .filter((d) => !attributes.every((attribute) => isNaN(d[attribute])));
  }
</script>

<main class="flex flex-row w-screen h-screen bg-slate-900">
  <div class="h-full grow">
    <StationsMap {stations} />
  </div>
  {#if $timeSeries}
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
  {/if}
</main>
