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
    year: "0122-0131",
    台北永春: 11.67,
    台北北醫: 7.56,
  },
  {
    year: "0201-0210",
    台北永春: 12.55,
    台北北醫: 7.37,
  },
  {
    year: "0211-0220",
    台北永春: 12.31,
    台北北醫: 8.9,
  },
];

const Test2 = () => {
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            iconSize={25}
            iconType="rect"
            wrapperStyle={{ fontWeight: "600" }}
          />
          {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
          <Bar dataKey="台北北醫" fill="#82ca9d" />
          <Bar dataKey="台北永春" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Test2;
