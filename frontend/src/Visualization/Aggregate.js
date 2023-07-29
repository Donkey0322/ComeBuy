import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import GridToolBar from "../components/GridToolBar";
import { useCondition } from "../hooks/useCondition";

const levelMap = {
  region: "區域",
  county: "縣市",
  district: "地方區域",
  store: "門市",
};

export default function AggregateAnalysis({ data }) {
  const { systemState } = useCondition();
  const label = [
    "序號",
    `${levelMap[systemState?.locationLevel]}名稱`,
    "飲品",
    "額外條件",
    `${systemState?.part ? "該品項" : "全品項"}總杯數`,
    "飲品杯數",
    "杯數佔比",
    `${systemState?.part ? "該品項" : "全品項"}總金額`,
    "飲品金額",
    "金額佔比",
  ];

  const DATA = data
    ? {
        column: label
          .filter((l) => l !== "額外條件" || data?.[0]?.constraint)
          .map((m) => ({
            field: m,
            headerName: m,
            flex: 1,
            renderCell: ({ value }) =>
              value < 1 ? `${(value * 100).toFixed(2)}%` : value,
          })),
        row: data.map((m, index) => ({
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
          額外條件: m.constraint,
        })),
      }
    : "";

  return (
    <Box sx={{ width: "100%" }}>
      {DATA && (
        <DataGrid
          autoHeight
          rows={DATA.row}
          columns={DATA.column}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{
            toolbar: () => (
              <GridToolBar
                fileName={`${data?.[0]?.start_date} ~ ${data?.[0]?.end_date} 數據統整表`}
              />
            ),
          }}
          getRowId={(row) => row.序號}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
