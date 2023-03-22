import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  // Container,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

const DATA = {
  label: [
    "序號",
    "門市名稱",
    "總杯數",
    "飲品",
    "飲品杯數",
    "杯數佔比",
    "總金額",
    "飲品金額",
    "金額佔比",
  ],
  data: [
    [1, "台北永春", 3714, "招牌奶茶", 470, "12.65%", 126700, 15100, "11.91%"],
    [2, "台北北醫", 5376, "招牌奶茶", 641, "11.92%", 143500, 19200, "13.37%"],
    [3, "台北延吉", 5520, "招牌奶茶", 494, "8.95%", 134000, 15000, "11.19%"],
    [4, "松山新東", 3613, "招牌奶茶", 296, "18.19%", 110000, 9200, "8.36%"],
    [5, "台北永吉", 3895, "招牌奶茶", 315, "8.09%", 94500, 9500, "10.05%"],
    [6, "台北饒河", 3138, "招牌奶茶", 249, "7.93%", 114500, 7500, "6.55%"],
  ],
};

const TEST = {
  column: DATA.label.map((m) => ({
    field: m,
    headerName: m,
    flex: 1,
  })),
  row: DATA.data.map((m) =>
    m.reduce(
      (acc, curr, currIndex) => ((acc[DATA.label[currIndex]] = curr), acc),
      {}
    )
  ),
};

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

const DataGridDemo = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={TEST.row}
        columns={TEST.column}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{ toolbar: CustomToolBar }}
        getRowId={(row) => row.序號}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridDemo;
