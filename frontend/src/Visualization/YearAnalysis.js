import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import MuiTool, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Drawer from "../components/Drawer";
import Graph from "../components/Graph";
import useGraph from "../hooks/useGraph";
import { getLineChart } from "../middleware";

const LightTooltip = styled(({ className, ...props }) => (
  <MuiTool {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000000",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: 20,
  },
}));

const LineChartAnalysis = ({ data, THEME, setTheme }) => {
  const {
    period,
    showType,
    setShowType,
    graphType,
    setGraphType,
    constraint,
    setConstraint,
    points,
    key,
    handlePeriodChange,
    handleLegendClick,
  } = useGraph(data, getLineChart, "year");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Drawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        showType={showType}
        setShowType={setShowType}
        graphType={graphType}
        setGraphType={setGraphType}
        constraint={constraint}
        setConstraint={setConstraint}
        constraints={data
          .map((d) => d.constraint)
          .filter((value, index, array) => array.indexOf(value) === index)}
      />
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
            onChange={handlePeriodChange}
            value={period}
          />
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "2vmin" }}>
          {points.point.map((_, index) => (
            <LightTooltip
              key={index}
              arrow
              title={
                <div>
                  <HexColorPicker
                    color={THEME[index]}
                    onChange={(e) => {
                      let newTheme = JSON.parse(JSON.stringify(THEME));
                      newTheme[index] = e;
                      setTheme(newTheme);
                    }}
                  />
                </div>
              }
            >
              <Box
                style={{
                  width: "5vmin",
                  height: "5vmin",
                  borderRadius: "50%",
                  border: "2px solid black",
                  backgroundColor: THEME[index],
                  cursor: "pointer",
                }}
              />
            </LightTooltip>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            More
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={600}>
            {constraint} {showType}
          </Typography>
        </Box>
        <Graph
          graphType={graphType}
          points={points}
          THEME={THEME}
          handleLegendClick={handleLegendClick}
          graphKey={key}
          xAxisProps={{ tickLine: false }}
          yAxisProps={{ tickLine: false, domain: [1, "auto"], type: "number" }}
        />
      </Box>
    </Box>
  );
};

export default LineChartAnalysis;
