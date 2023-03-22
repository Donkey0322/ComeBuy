import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Container,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from "@mui/material";

const DATA = [
  { year: 2016 },
  {
    year: 2017,
    台北永春: 5.11,
    台北北醫: 4.23,
  },
  {
    year: 2018,
    台北永春: 5.22,
    台北北醫: 6.85,
  },
  {
    year: 2019,
    台北永春: 6.88,
    台北北醫: 7.68,
  },
  {
    year: 2020,
    台北永春: 7.48,
    台北北醫: 3.46,
  },
  {
    year: 2021,
    台北永春: 4.52,
    台北北醫: 5.96,
  },
  {
    year: 2022,
    台北永春: 6.75,
    台北北醫: 9.56,
  },
  {
    year: 2023,
    台北永春: 9.76,
    台北北醫: 3.24,
  },
  {
    year: 2024,
  },
];

const Test = () => {
  const [opacity, setOpacity] = useState({
    台北永春: 1,
    台北北醫: 1,
  });
  const [data, setData] = useState(DATA);
  const [year, setYear] = useState(1);
  // const handleMouseEnter = (o) => {
  //   const { dataKey } = o;
  //   setOpacity((prev) => ({ ...prev, [dataKey]: 0.5 }));
  // };
  // const handleMouseLeave = (o) => {
  //   const { dataKey } = o;
  //   setOpacity((prev) => ({ ...prev, [dataKey]: 1 }));
  // };
  const handleYearChange = (e) => {
    const { value } = e.target;
    if (value >= 1) {
      setYear(Number(value));
    }
  };
  const 點按圖例 = (e) => {
    const {
      dataKey,
      payload: { strokeOpacity },
    } = e;
    console.log(strokeOpacity);
    setOpacity((prev) => ({ ...prev, [dataKey]: 1 - strokeOpacity }));
  };

  // useEffect(() => {
  //   setData(
  //     [...DATA]
  //       .reverse()
  //       .map((D, index) =>
  //         index < year + 1 ? D : index === year + 1 && { year: D.year }
  //       )
  //       .filter((d) => d)
  //       .reverse()
  //   );
  // });

  return (
    <div style={{ width: "100%" }}>
      <FormControl sx={{ mb: 3, width: "25ch" }} variant="outlined">
        <InputLabel id="demo-select-small">年</InputLabel>
        <OutlinedInput
          // labelId="demo-select-small"
          label="年"
          type="number"
          onChange={handleYearChange}
          value={year}
        />
      </FormControl>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={100}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="year" tickLine={false} />
          <YAxis tickLine={false} domain={[1, "auto"]} type="number" />
          <Tooltip />
          <Legend
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            onClick={點按圖例}
            iconSize={25}
            iconType="rect"
            wrapperStyle={{
              fontWeight: "600",
              cursor: "pointer",
            }}
          />
          <Line
            // type="monotone"
            type="linear"
            dataKey="台北北醫"
            strokeOpacity={opacity.台北北醫}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={3}
            style={{ opacity: 1 }}
            // stroke
          />
          <Line
            type="monotone"
            dataKey="台北永春"
            strokeOpacity={opacity.台北永春}
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Test;
