import React, { useState, useCallback, useEffect } from "react";
import {
  BarChart,
  Bar,
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
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { useCondition } from "../hooks/useCondition";
import { getBarChart } from "../middleware";

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

const BarChartAnalysis = ({ data, THEME }) => {
  const [period, setPeriod] = useState(3);
  const {
    condition: {
      time: { date },
    },
  } = useCondition();
  const [showType, setShowType] = useState("杯數佔比");

  const dataFormatProcessing = (rawData, period, type = "杯數佔比") => {
    let location = new Set();
    const result = _.range(period)
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
            acc[curr.location] =
              curr[
                type === "杯數佔比" ? "amount_proportion" : "price_proportion"
              ];
            location.add(curr.location);
          }
          return acc;
        }, temp);
        return temp;
      })
      .reverse();
    return {
      data: result,
      bar: [...location].map((l) => ({ name: l, hide: false })),
    };
  };

  const [bars, setBars] = useState(dataFormatProcessing(data, 3));
  const [key, setKey] = useState(0);
  const debounceFetchBar = useCallback(
    _.debounce(async (period) => {
      const result = await getBarChart({ period });
      setBars(dataFormatProcessing(result, period));
      setKey((prev) => prev + 1);
    }, 300),
    []
  );

  const handlePeriodChange = (e) => {
    const { value } = e.target;
    if (value >= 1) {
      setPeriod(Number(value));
      debounceFetchBar(value);
    }
  };

  useEffect(() => {
    if (data) {
      setBars(dataFormatProcessing(data, 3));
      setKey((prev) => prev + 1);
    }
  }, [data]);

  useEffect(() => {
    if (showType) {
      setBars(dataFormatProcessing(data, 3, showType));
      setKey((prev) => prev + 1);
    }
  }, [showType]);

  const 點按圖例 = (e) => {
    setBars((prev) => ({
      ...prev,
      bar: prev.bar.map((b) =>
        b.name === e.dataKey ? { name: b.name, hide: !b.hide } : b
      ),
    }));
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        <FormControl sx={{ mb: 3, width: "25ch" }} variant="outlined">
          <InputLabel id="demo-select-small">期數</InputLabel>
          <OutlinedInput
            label="期數"
            type="number"
            onChange={handlePeriodChange}
            value={period}
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
          <BarChart
            width={500}
            height={300}
            data={bars.data}
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
              iconSize={25}
              iconType="rect"
              wrapperStyle={{ fontWeight: "600" }}
              verticalAlign="top"
              onClick={點按圖例}
            />
            {bars.bar.map((l, index) => (
              <Bar
                key={index}
                dataKey={l.name}
                fill={THEME[index]}
                hide={l.hide}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default BarChartAnalysis;
