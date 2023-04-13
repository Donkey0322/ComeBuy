import React from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useCondition } from "../hooks/useCondition";

const CustomToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: "各門市杯數及佔比",
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
};

const levelMap = {
  region: "區域",
  county: "縣市",
  district: "地方區域",
  store: "門市",
};

const StoreBeverage = ({ data }) => {
  const {
    condition: { location },
  } = useCondition();

  const DATA = {
    label: [
      "序號",
      `${levelMap[location?.[0].level]}名稱`,
      "飲品",
      "總杯數",
      "飲品杯數",
      "杯數佔比",
      "總金額",
      "飲品金額",
      "金額佔比",
      "交易日期",
    ],
    data,
  };

  const TEST = DATA.data
    ? {
        column: DATA?.label.map((m) => ({
          field: m,
          headerName: m,
          flex: m.includes("日期") ? 1.8 : 1,
          type: m.includes("日期") && "dateTime",
          valueGetter:
            m.includes("日期") && (({ value }) => value && new Date(value)),
        })),
        row: DATA?.data.map((m, index) =>
          // m.reduce(
          //   (acc, curr, currIndex) => ((acc[DATA.label[currIndex]] = curr), acc),
          //   {}
          // )
          ({
            序號: index,
            [`${levelMap[location?.[0].level]}名稱`]:
              m?.store ?? m?.region ?? m?.county ?? m.district,
            飲品: m.drink,
            總杯數: m.total_amount,
            飲品杯數: m.amount,
            杯數佔比: m.amount_proportion,
            總金額: m.total_price,
            飲品金額: m.price,
            金額佔比: m.price_proportion,
            交易日期: m.date,
          })
        ),
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
                pageSize: 50,
              },
            },
          }}
          slots={{ toolbar: CustomToolBar }}
          getRowId={(row) => row.序號}
          pageSizeOptions={[10, 25, 50, 100]}
          // pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default StoreBeverage;
