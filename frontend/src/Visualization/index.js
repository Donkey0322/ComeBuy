import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Store_Beverage from "./Store_Beverage";
import Store_BeverageDetail from "./Store_BeverageDetail";
import Test from "./Test";
import Test2 from "./Test2";

export default function LabTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ ml: 3, width: "90%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="總表" value="1" />
            <Tab label="各門市杯數及占比" value="2" />
            <Tab label="過去若干年趨勢" value="3" />
            <Tab label="過去若干時段趨勢" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Store_BeverageDetail />
        </TabPanel>
        <TabPanel value="2">
          <Store_Beverage />
        </TabPanel>
        <TabPanel value="3">
          <Test />
        </TabPanel>
        <TabPanel value="4">
          <Test2 />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
