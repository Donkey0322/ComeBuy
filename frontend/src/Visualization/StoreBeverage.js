import { Box, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import GridToolBar from "../components/GridToolBar";
import { useCondition } from "../hooks/useCondition";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    constraint: {
      main: "#03a9f4",
      contrastText: "#fff",
    },
  },
});

const ConstraintsContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5vmin;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d8d8d8;
    height: 1px;
    &:hover {
      /* background-color: ; */
    }
  }
`;

const levelMap = {
  region: "區域",
  county: "縣市",
  district: "地方區域",
  store: "門市",
};

const StoreBeverage = ({ data }) => {
  const { systemState } = useCondition();

  const DATA = {
    label: [
      "序號",
      "交易日期",
      `${levelMap[systemState?.locationLevel]}名稱`,
      "飲品",
      "額外條件",
      `${systemState?.part ? "該品項" : "全品項"}總杯數`,
      "飲品杯數",
      "杯數佔比",
      `${systemState?.part ? "該品項" : "全品項"}總金額`,
      "飲品金額",
      "金額佔比",
    ],
    data,
  };

  const TEST = DATA.data
    ? {
        column: DATA?.label
          .filter((l) => l !== "額外條件" || data?.[0]?.constraints)
          .map((m) => ({
            field: m,
            headerName: m,
            flex: m.includes("額外條件") ? 2 : 1,
            type: m.includes("日期") && "dateTime",
            renderCell: ({ value, row }) =>
              m === "額外條件" ? (
                <ConstraintsContainer>
                  {value
                    .split(",")
                    .sort(
                      (a, b) =>
                        row["全部"].includes(b) - row["全部"].includes(a)
                    )
                    .map((all, index) => (
                      <ThemeProvider theme={theme} key={index}>
                        <Chip
                          key={index}
                          label={all}
                          color={
                            row["全部"].includes(all) ? "constraint" : "default"
                          }
                        />
                      </ThemeProvider>
                    ))}
                </ConstraintsContainer>
              ) : m.includes("日期") ? (
                moment(value).format("YYYY-MM-DD")
              ) : value < 1 ? (
                `${(value * 100).toFixed(2)}%`
              ) : (
                value
              ),
            valueGetter: ({ value }) =>
              m.includes("日期")
                ? new Date(value)
                : m === "額外條件"
                ? value.join(",")
                : value,
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
          額外條件: m.all,
          全部: m.constraints,
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
          slots={{
            toolbar: () => <GridToolBar fileName="各門市杯數及佔比" />,
          }}
          getRowId={(row) => row.序號}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default StoreBeverage;
