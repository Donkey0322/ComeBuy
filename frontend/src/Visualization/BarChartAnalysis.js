import React from "react";
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
  s,
} from "recharts";

const data = [
  {
    year: "2016-09-20 2019-12-31",
    台北永春: 11.67,
    台北北醫: 7.56,
  },
  {
    year: "2016-09-20 2019-12-31",
    台北永春: 12.55,
    台北北醫: 7.37,
  },
  {
    year: "2016-09-20 2019-12-31",
    台北永春: 12.31,
    台北北醫: 8.9,
  },
];

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

const BarChartAnalysis = () => {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
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
            // margin={{  }}
          />
          {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
          <Bar dataKey="台北北醫" fill="#82ca9d" />
          <Bar dataKey="台北永春" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartAnalysis;
