import React, { useCallback, useEffect, useState } from "react";
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
import { useCondition } from "../hooks/useCondition";
import _ from "lodash";
import { getLineChart } from "../middleware";

const THEME = _.range(10).map(
  () =>
    "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
);

const LineChartAnalysis = ({ data }) => {
  const [opacity, setOpacity] = useState({
    台北永春: 1,
    台北北醫: 1,
  });
  // const [data, setData] = useState(DATA);
  const [year, setYear] = useState(3);
  const [key, setKey] = useState(1);
  const {
    condition: {
      time: {
        date: { end },
      },
      location,
    },
  } = useCondition();
  const baseYear = end.$y;
  const dataFormatProcessing = (rawData) =>
    _.range(baseYear - year, baseYear + 2).map((y, index) => {
      let temp = { year: y };
      if (index !== 0 && index !== year + 2) {
        temp = rawData?.reduce((acc, curr) => {
          if (curr.year === y) {
            acc[curr.store] = curr.amount;
          }
          return acc;
        }, temp);
      }
      return temp;
    });
  const [points, setPoints] = useState(dataFormatProcessing(data));
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
      debounceFetchLine(value);
    }
  };

  const debounceFetchLine = useCallback(
    _.debounce(async (year) => {
      const result = await getLineChart({ year });
      setPoints(dataFormatProcessing(result));
      setKey((prev) => prev + 1);
    }, 800),
    []
  );

  const 點按圖例 = (e) => {
    const {
      dataKey,
      payload: { strokeOpacity },
    } = e;
    console.log(strokeOpacity);
    setOpacity((prev) => ({ ...prev, [dataKey]: 1 - strokeOpacity }));
  };

  // const processData

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
      {points.length > 0 && (
        <>
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
              data={points}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              key={key}
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
              {location.map((l, index) => (
                <Line
                  // type="monotone"
                  type="linear"
                  dataKey={l.name}
                  // strokeOpacity={opacity.台北北醫}
                  stroke={THEME[index]}
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  style={{ opacity: 1 }}
                  // stroke
                  key={index}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default LineChartAnalysis;
