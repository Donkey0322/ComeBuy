import React, { useState } from "react";
import { Box, Tab, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StoreBeverage from "./StoreBeverage";
import LineChartAnalysis from "./LineChartAnalysis";
import BarChartAnalysis from "./BarChartAnalysis";
import { useCondition } from "../hooks/useCondition";
import moment from "moment";
import { searchItem, getLineChart, getBarChart } from "../middleware";

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const { condition } = useCondition();
  const [result, setResult] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearchClick = async () => {
    try {
      if (
        Object.keys(condition.time).length === 0 ||
        condition.location.length === 0 ||
        condition.beverage.length === 0
      ) {
        console.log("不符合");
        return;
      }
      let temp = {
        start_date: moment(condition.time.date.start.toISOString()).format(
          "YYYY-MM-DD"
        ),
        end_date: moment(condition.time.date.end.toISOString()).format(
          "YYYY-MM-DD"
        ),
        drink: condition.beverage[0],
      };
      if (
        moment(condition.time.time.end.toISOString()).format("HH:mm") !==
        "23:59"
      ) {
        temp.start_hour = condition.time.time.start.$H;
        temp.end_hour = condition.time.time.end.$H;
      }
      temp = ["counties", "districts", "regions", "stores"].reduce(
        (acc, curr) => {
          acc[curr] = curr.includes(
            condition.location?.[0].level.substring(0, 5)
          )
            ? condition.location.map((l) => l.name)
            : [];
          return acc;
        },
        temp
      );
      const data = await searchItem(temp);
      setResult((prev) => ({ ...prev, StoreBeverage: data }));
      const line = await getLineChart({ year: 3 });
      setResult((prev) => ({ ...prev, LineChart: line }));
      const bar = await getBarChart({ period: 3 });
      console.log(bar);
      setResult((prev) => ({ ...prev, BarChart: bar }));
    } catch (error) {
      throw error;
    }
  };
  return (
    <Box sx={{ ml: 3, width: "90%", typography: "body1" }}>
      <Button variant="contained" onClick={handleSearchClick}>
        送出
      </Button>
      {Object.keys(result).length > 0 && (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="各門市杯數及占比" value="1" />
              <Tab label="過去若干年趨勢" value="2" />
              <Tab label="過去若干時段趨勢" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <StoreBeverage data={result.StoreBeverage} />
          </TabPanel>
          <TabPanel value="2">
            <LineChartAnalysis data={result.LineChart} />
          </TabPanel>
          <TabPanel value="3">
            <BarChartAnalysis />
          </TabPanel>
        </TabContext>
      )}
    </Box>
  );
}
