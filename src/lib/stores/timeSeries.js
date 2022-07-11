import * as d3 from "d3";
import { writable } from "svelte/store";
import csv from "../../assets/data.csv?raw";

export const timeSeries = writable([]);
export const timeRange = writable([undefined, undefined]);

export function loadTimeSeriesData() {
  const data = d3.csvParse(csv, (row) => ({
    id: row.station_id,
    date: new Date(row.date + "T00:00"),
    temperature_air_min_200: Number.parseFloat(row.temperature_air_min_200),
    temperature_air_mean_200: Number.parseFloat(row.temperature_air_mean_200),
    temperature_air_max_200: Number.parseFloat(row.temperature_air_max_200),
  }));
  timeRange.set(d3.extent(data, (d) => d.date));
  timeSeries.set(d3.group(data, (d) => d.id));
}
