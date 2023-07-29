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
import { getBarChart } from "../middleware";

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
const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  if (!payload) return payload;
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

export default function PeriodAnalysis({ data, THEME, setTheme }) {
  const {
    period,
    showType,
    setShowType,
    graphType,
    setGraphType,
    calType,
    setCalType,
    constraint,
    setConstraint,
    points,
    key,
    handlePeriodChange,
    handleLegendClick,
  } = useGraph(data, getBarChart);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box style={{ width: "100%" }}>
      <Drawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        showType={showType}
        setShowType={setShowType}
        graphType={graphType}
        setGraphType={setGraphType}
        calType={calType}
        setCalType={setCalType}
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
          width: "99%",
          mb: 4,
        }}
      >
        <FormControl sx={{ width: "25ch" }} variant="outlined">
          <InputLabel id="demo-select-small">期數</InputLabel>
          <OutlinedInput
            label="期數"
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
                <HexColorPicker
                  color={THEME[index]}
                  onChange={(e) => {
                    let newTheme = JSON.parse(JSON.stringify(THEME));
                    newTheme[index] = e;
                    setTheme(newTheme);
                  }}
                />
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
        <Typography variant="h6" fontWeight={600} sx={{ ml: 0 }}>
          {constraint} {showType}
        </Typography>
        <Graph
          graphType={graphType}
          points={points}
          THEME={THEME}
          handleLegendClick={handleLegendClick}
          graphKey={key}
          xAxisProps={{ tick: CustomizedAxisTick }}
        />
      </Box>
    </Box>
  );
}
