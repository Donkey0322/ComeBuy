import React, { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { styled } from "@mui/material/styles";
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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MuiTool, { tooltipClasses } from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCondition } from "../hooks/useCondition";
import _ from "lodash";
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
  const [year, setYear] = useState(3);
  const [key, setKey] = useState(1);
  const [showType, setShowType] = useState("杯數佔比");
  const [constraint, setConstraint] = useState(data?.[0]?.constraint);
  const {
    condition: {
      time: {
        date: { end },
      },
    },
  } = useCondition();
  const baseYear = end.$y;

  const dataFormatProcessing = (
    rawData,
    year,
    type = "杯數佔比",
    constraint = undefined
  ) => {
    let location = new Set();
    const result = _.range(baseYear - year, baseYear + 2).map((y, index) => {
      let temp = { year: y };
      if (index !== 0 && index !== year + 2) {
        temp = rawData?.reduce((acc, curr) => {
          if (
            curr.year === y &&
            (!constraint || constraint === curr.constraint)
          ) {
            acc[
              // constraint
              //   ? `${curr.location} ${curr.drink} ${constraint}`
              //   : `${curr.location} ${curr.drink}`
              `${curr.location} ${curr.drink}`
            ] =
              curr[
                type === "杯數佔比" ? "amount_proportion" : "price_proportion"
              ];
            location.add(
              // constraint
              //   ? `${curr.location} ${curr.drink} ${constraint}`
              //   : `${curr.location} ${curr.drink}`
              `${curr.location} ${curr.drink}`
            );
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
  const [points, setPoints] = useState(
    dataFormatProcessing(data, 3, showType, constraint)
  );
  const debounceFetchLine = useCallback(
    _.debounce(async (year) => {
      const result = await getLineChart({ year });
      setPoints(dataFormatProcessing(result, year, showType, constraint));
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
      setPoints(dataFormatProcessing(data, 3, "杯數佔比", constraint));
      setKey((prev) => prev + 1);
    }
  }, [data]);

  useEffect(() => {
    if (showType) {
      setPoints(dataFormatProcessing(data, year, showType, constraint));
      setKey((prev) => prev + 1);
    }
  }, [showType]);

  useEffect(() => {
    if (constraint) {
      setPoints(dataFormatProcessing(data, year, showType, constraint));
      setKey((prev) => prev + 1);
    }
  }, [constraint]);

  /*constraint 套組*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuItemClick = (e) => {
    setConstraint(e.target.innerText);
    setAnchorEl(null);
  };
  /************************************************** */

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
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "2vmin" }}
            >
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                fontWeight={600}
                // sx={{ ml: 6 }}
              >
                {constraint} {showType}
              </Typography>
              {Boolean(
                data?.map((d) => d.constraint).filter((d) => d).length
              ) && (
                <>
                  <IconButton
                    id="basic-button"
                    aria-controls={menuOpen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    <KeyboardArrowDownIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={() => {
                      setAnchorEl(null);
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {data
                      .map((d) => d.constraint)
                      .filter(
                        (value, index, array) => array.indexOf(value) === index
                      )
                      .map((d, index) => (
                        <MenuItem onClick={handleMenuItemClick} key={index}>
                          {d}
                        </MenuItem>
                      ))}
                  </Menu>
                </>
              )}
            </Box>

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
                    type="linear"
                    dataKey={l.name}
                    stroke={THEME[index]}
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
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
