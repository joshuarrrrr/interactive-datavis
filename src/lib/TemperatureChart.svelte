<script>
  import * as d3 from "d3";
  export let data = [];
  export let domain = [-20, 40];
  export let dateFormat = d3.timeFormat("%b %y");

  let width;
  let height;
  let marginRight = 40;

  $: xScale = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width - marginRight]);
  $: yScale = d3.scaleLinear().domain(domain).range([height, 0]);
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
  $: xTicks = xScale.ticks(width / 100);
  $: yTicks = yScale.ticks(3);
</script>

<div id="container" class="w-full min-h-fit" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full">
    <g id="ticks-x">
      {#each xTicks as value (value)}
        <g class="tick" transform="translate({xScale(value)},0)">
          <line class="tick" y1={0} y2={height} />
          <text y={yScale.range()[0]} dx="0.2em" dy="-0.4em" fill="white">
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
  </svg>
</div>

<style lang="postcss">
  #container {
    @apply bg-slate-700;
  }

  svg {
    aspect-ratio: 16 / 9;
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
</style>
