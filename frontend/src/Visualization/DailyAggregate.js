import { Box } from "@mui/material";
import MuiTool, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GridToolBar from "../components/GridToolBar";
import { useCondition } from "../hooks/useCondition";
const moment = extendMoment(Moment);

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

const levelMap = {
  region: "區域",
  county: "縣市",
  district: "地方區域",
  store: "門市",
};

const DailyAggregate = ({ data, THEME, setTheme }) => {
  const dataFormatProcessing = (rawData, type = "飲品杯數") => {
    let location = new Set();
    let dateRange = [...new Set(rawData.map((m) => m.date))];
    const result = [
      ...moment
        .range(
          moment(dateRange[0]).subtract(1, "d"),
          moment(dateRange[dateRange.length - 1]).add(1, "d")
        )
        .by("day"),
    ]
      .map((m) => m.format("YYYY-MM-DD"))
      .map((date, index) => {
        let temp = { date };
        temp = rawData?.reduce((acc, curr) => {
          if (curr.date === date) {
            acc[`${curr.location} ${curr.drink}`] =
              curr[
                "amount"
                // type === "杯數佔比" ? "amount_proportion" : "price_proportion"
              ];
            location.add(`${curr.location} ${curr.drink}`);
          }
          return acc;
        }, temp);
        return temp;
      });
    return {
      data: result,
      point: [...location].map((l) => ({ name: l, hide: false })),
    };
  };

  let groupedData = data.reduce(
    (
      acc,
      {
        date,
        location,
        drink,
        price,
        amount,
        total_price,
        total_amount,
        price_proportion,
        amount_proportion,
      }
    ) => {
      const key = `${date}/${location}/${drink}`;

      if (!acc[key]) {
        acc[key] = {
          price: 0,
          amount: 0,
          total_price,
          total_amount,
          price_proportion: 0,
          amount_proportion: 0,
        };
      }

      acc[key].price = acc[key].price + price;
      acc[key].amount = acc[key].amount + amount;
      acc[key].price_proportion = acc[key].price_proportion + price_proportion;
      acc[key].amount_proportion =
        acc[key].amount_proportion + amount_proportion;
      return acc;
    },
    {}
  );

  groupedData = Object.keys(groupedData).map((m) => {
    let [date, location, drink] = m.split("/");
    return { date, location, drink, ...groupedData[m] };
  });

  const { systemState } = useCondition();
  const [points, setPoints] = useState(dataFormatProcessing(groupedData));
  const [showType, setShowType] = useState("杯數佔比");
  const [key, setKey] = useState(1);

  const 點按圖例 = (e) => {
    setPoints((prev) => ({
      ...prev,
      point: prev.point.map((p) =>
        p.name === e.dataKey ? { name: p.name, hide: !p.hide } : p
      ),
    }));
  };

  const DATA = {
    label: [
      "序號",
      "交易日期",
      `${levelMap[systemState?.locationLevel]}名稱`,
      "飲品",
      `${systemState?.part ? "該品項" : "全品項"}總杯數`,
      "飲品杯數",
      "杯數佔比",
      `${systemState?.part ? "該品項" : "全品項"}總金額`,
      "飲品金額",
      "金額佔比",
    ],
    data: groupedData,
  };

  const TEST = DATA.data
    ? {
        column: DATA?.label
          .filter((l) => l !== "額外條件" || data?.[0]?.constraints)
          .map((m) => ({
            field: m,
            headerName: m,
            flex: 1,
            type: m.includes("日期") && "dateTime",
            renderCell: ({ value, row }) =>
              m.includes("日期")
                ? moment(value).format("YYYY-MM-DD")
                : value < 1
                ? `${(value * 100).toFixed(2)}%`
                : value,
            valueGetter: ({ value }) =>
              m.includes("日期") ? new Date(value) : value,
          })),
        row: DATA?.data.map((m, index) => ({
          序號: index + 1,
          [`${levelMap[systemState?.locationLevel]}名稱`]: m.location,
          飲品: m.drink,
          [`${systemState?.part ? "該品項" : "全品項"}總杯數`]: m.total_amount,
          飲品杯數: m.amount,
          杯數佔比: m.amount_proportion,
          [`${systemState?.part ? "該品項" : "全品項"}總金額`]: m.total_price,
          飲品金額: m.price,
          金額佔比: m.price_proportion,
          交易日期: m.date,
        })),
      }
    : "";

  return (
    <Box sx={{ width: "100%" }}>
      {TEST && (
        <DataGrid
          autoHeight
          rows={TEST.row}
          columns={TEST.column}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: () => <GridToolBar fileName="單日銷貨數據" /> }}
          getRowId={(row) => row.序號}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
        />
      )}
      <Box sx={{ width: "100%", mt: 3 }}>
        {points?.point?.length > 0 && (
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "2vmin",
                }}
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
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
              }}
            >
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
                  <XAxis dataKey="date" tickLine={false} />
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
      </Box>
    </Box>
  );
};

export default DailyAggregate;
