<script>
  import * as d3 from "d3";
  export let data = [];
  export let dateFormat = d3.timeFormat("%b %y");

  let width;
  let height;
  const margin = { left: 0, right: 30, top: 20, bottom: 20 };

  $: xScale = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date))
    .range([margin.left, width - margin.left - margin.right]);
  $: yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d.temperature_air_min_200 || d.temperature_air_mean_200),
      d3.max(data, (d) => d.temperature_air_max_200 || d.temperature_air_mean_200),
    ])
    .range([height - margin.top - margin.bottom, margin.top])
    .nice();
  $: area = d3
    .area()
    .defined((d) => !isNaN(d.temperature_air_min_200) && !isNaN(d.temperature_air_max_200))
    .x((d) => xScale(d.date))
    .y0((d) => yScale(d.temperature_air_min_200))
    .y1((d) => yScale(d.temperature_air_max_200));
  $: line = d3
    .line()
    .curve(d3.curveLinear)
    .defined((d) => !isNaN(d.temperature_air_mean_200))
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.temperature_air_mean_200));
  $: xTicks = d3.timeMonth.every(1).range(xScale.domain()[0], xScale.domain()[1]);
  $: yTicks = yScale.ticks(height / 60);
</script>

<div id="container" class="w-full min-h-fit" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full">
    {#if data.length}
      <g id="ticks-x">
        {#each xTicks as value (value)}
          <g class="tick" transform="translate({xScale(value)},0)">
            <line class="tick" y1={0} y2={height} />
            <text y={height} dx="0.2em" dy="-0.4em" fill="white">
              {dateFormat(value)}
            </text>
          </g>
        {/each}
      </g>

      <g id="ticks-y">
        {#each yTicks as value (value)}
          <g class="tick" transform="translate(0,{yScale(value)})">
            <line class="tick" x1={0} x2={width} />
            <text x={width} text-anchor="end" dx="-0.2em" dy="-0.2em" fill="white">
              {value}
            </text>
          </g>
        {/each}
      </g>

      <path id="area" d={area(data)} fill="black" stroke="none" />

      <path
        id="line"
        d={line(data)}
        fill="none"
        stroke="white"
        stroke-width={1.5}
        stroke-linecap="round"
      />
    {:else}
      <text id="nodata" x={width / 2} y={height / 2} text-anchor="middle">No data</text>
    {/if}
  </svg>
</div>

<style lang="postcss">
  #container {
    @apply bg-slate-700;
  }

  svg {
    aspect-ratio: 3 / 1;
  }

  #area {
    fill: theme("colors.slate.500");
    opacity: 0.3;
  }

  #line {
    stroke: theme("colors.slate.200");
  }

  .tick line {
    stroke: theme("colors.slate.600");
  }

  .tick text {
    fill: theme("colors.slate.500");
  }

  #nodata {
    fill: theme("colors.slate.500");
    @apply text-xl;
  }
</style>
