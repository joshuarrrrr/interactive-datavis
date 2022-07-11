<script>
  import * as d3 from "d3";
  export let data = [];
  export let width = 128;
  export let height = 24;
  export let color = "black";
  export let margin = { left: 30, right: 10, top: 4, bottom: 4 };

  $: xScale = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date))
    .range([margin.left, width - margin.left - margin.right]);
  $: yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.value))
    .range([height - margin.bottom, margin.top]);
  $: line = d3
    .line()
    .curve(d3.curveLinear)
    .defined((d) => !isNaN(d.value))
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  $: values = data.filter((d) => !isNaN(d.value));
  $: first = values.at(0);
  $: last = values.at(-1);
</script>

<svg {width} {height}>
  <path id="line" d={line(data)} stroke-width={1.5} stroke-linecap="round" stroke={color} />

  {#if first}
    {@const { date, value } = first}
    <g class="tick" transform="translate({xScale(date)},{yScale(value)})">
      <circle r="2" fill={color} />
      <text dx="-0.3em" dy=".3em" text-anchor="end" fill={color}>{Math.round(value)}</text>
    </g>
  {/if}

  {#if last}
    {@const { date, value } = last}
    <g class="tick" transform="translate({xScale(date)},{yScale(value)})">
      <circle r="2" fill={color} />
      <text dx="0.3em" dy=".3em" text-anchor="begin" fill={color}>{Math.round(value)}</text>
    </g>
  {/if}
</svg>

<style lang="postcss">
  #line {
    fill: none;
  }

  text {
    font-size: 11px;
  }
</style>
