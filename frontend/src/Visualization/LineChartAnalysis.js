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
  FormControl,
  OutlinedInput,
  InputLabel,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useCondition } from "../hooks/useCondition";
import _ from "lodash";
import { getLineChart } from "../middleware";

const LineChartAnalysis = ({ data, THEME }) => {
  const [year, setYear] = useState(3);
  const [key, setKey] = useState(1);
  const [showType, setShowType] = useState("杯數佔比");
  const {
    condition: {
      time: {
        date: { end },
      },
    },
  } = useCondition();
  const baseYear = end.$y;
  const dataFormatProcessing = (rawData, year, type = "杯數佔比") => {
    let location = new Set();
    const result = _.range(baseYear - year, baseYear + 2).map((y, index) => {
      let temp = { year: y };
      if (index !== 0 && index !== year + 2) {
        temp = rawData?.reduce((acc, curr) => {
          if (curr.year === y) {
            acc[`${curr.location} ${curr.drink}`] =
              curr[
                type === "杯數佔比" ? "amount_proportion" : "price_proportion"
              ];
            location.add(`${curr.location} ${curr.drink}`);
          }
          return acc;
        }, temp);
      }
      return temp;
    });

    return {
      data: result,
      point: [...location].map((l) => ({ name: l, hide: false })),
    };
  };
  const [points, setPoints] = useState(dataFormatProcessing(data, 3, showType));
  const debounceFetchLine = useCallback(
    _.debounce(async (year) => {
      const result = await getLineChart({ year });
      setPoints(dataFormatProcessing(result, year, showType));
      setKey((prev) => prev + 1);
    }, 300),
    []
  );

  const handleYearChange = (e) => {
    const { value } = e.target;
    if (value >= 1) {
      setYear(Number(value));
      debounceFetchLine(value);
    }
  };

  useEffect(() => {
    if (data) {
      setPoints(dataFormatProcessing(data, 3));
      setKey((prev) => prev + 1);
    }
  }, [data]);

  useEffect(() => {
    if (showType) {
      setPoints(dataFormatProcessing(data, 3, showType));
      setKey((prev) => prev + 1);
    }
  }, [showType]);

  const 點按圖例 = (e) => {
    setPoints((prev) => ({
      ...prev,
      point: prev.point.map((p) =>
        p.name === e.dataKey ? { name: p.name, hide: !p.hide } : p
      ),
    }));
  };

  return (
    <div style={{ width: "100%" }}>
      {points.point.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mb: 2,
            }}
          >
            <FormControl sx={{ width: "25ch" }} variant="outlined">
              <InputLabel>年</InputLabel>
              <OutlinedInput
                label="年"
                type="number"
                onChange={handleYearChange}
                value={year}
              />
            </FormControl>
            <ToggleButtonGroup
              value={showType}
              onChange={(_, newV) => {
                if (newV) {
                  setShowType(newV);
                }
              }}
              sx={{ position: "relative", right: 0 }}
              exclusive
            >
              <ToggleButton value="杯數佔比">杯數佔比</ToggleButton>
              <ToggleButton value="金額佔比">金額佔比</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Typography variant="h6" fontWeight={600} sx={{ ml: 6 }}>
              {showType}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={100}
                height={300}
                data={points.data}
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
                {points.point.map((l, index) => (
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
                    hide={l.hide}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </div>
  );
};

export default LineChartAnalysis;
