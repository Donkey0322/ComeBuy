import React, { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormControl, OutlinedInput, InputLabel } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { useCondition } from "../hooks/useCondition";
import { getBarChart } from "../middleware";

const THEME = _.range(10).map(
  () =>
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
);

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  const [start, end] = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0}>
        <tspan textAnchor="middle" x="0" dy="15">
          {start}
        </tspan>
        <tspan textAnchor="middle" x="0" dy="20">
          {end}
        </tspan>
      </text>
    </g>
  );
};

const BarChartAnalysis = ({ data }) => {
  const [period, setPeriod] = useState(3);
  const {
    condition: {
      time: { date },
      location,
    },
  } = useCondition();

  const dataFormatProcessing = (rawData, period) =>
    _.range(period)
      .map((p) => {
        let temp = {
          year:
            moment(date.start.toISOString())
              .subtract(
                (moment(date.end.toISOString()).diff(
                  moment(date.start.toISOString()),
                  "days"
                ) +
                  1) *
                  p,
                "days"
              )
              .format("YYYY-MM-DD") +
            " " +
            moment(date.end.toISOString())
              .subtract(
                (moment(date.end.toISOString()).diff(
                  moment(date.start.toISOString()),
                  "days"
                ) +
                  1) *
                  p,
                "day"
              )
              .format("YYYY-MM-DD"),
        };
        temp = rawData?.reduce((acc, curr) => {
          if (curr.start_date === temp.year.split(" ")[0]) {
            acc[curr.stores] = curr.amount_proportion;
          }
          return acc;
        }, temp);
        return temp;
      })
      .reverse();

  const [bars, setBars] = useState(dataFormatProcessing(data, 3));
  const [key, setKey] = useState(0);

  const handlePeriodChange = (e) => {
    const { value } = e.target;
    if (value >= 1) {
      setPeriod(Number(value));
      debounceFetchBar(value);
    }
  };
  const debounceFetchBar = useCallback(
    _.debounce(async (period) => {
      const result = await getBarChart({ period });
      setBars(dataFormatProcessing(result, period));
      setKey((prev) => prev + 1);
    }, 800),
    []
  );

  return (
    <div style={{ width: "100%" }}>
      <FormControl sx={{ mb: 3, width: "25ch" }} variant="outlined">
        <InputLabel id="demo-select-small">期數</InputLabel>
        <OutlinedInput
          label="期數"
          type="number"
          onChange={handlePeriodChange}
          value={period}
        />
      </FormControl>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={bars}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
          key={key}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            iconSize={25}
            iconType="rect"
            wrapperStyle={{ fontWeight: "600" }}
            verticalAlign="top"
          />
          {location.map((l, index) => (
            <Bar key={index} dataKey={l.name} fill={THEME[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartAnalysis;
