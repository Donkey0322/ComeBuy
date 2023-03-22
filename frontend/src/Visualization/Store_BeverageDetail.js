import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Container,
} from "@mui/material";

const DATA = {
  label: [
    "分店代號",
    "分店名稱",
    "飲品代號",
    "名稱",
    "銷售數量",
    "銷售金額",
    "數量比例",
    "金額比例",
  ],
  data: [
    ["0045", "臺北北醫", "A030003", "招牌奶茶（大）", 130, 7765, 5.04, 6.12],
    ["0045", "臺北北醫", "A030003", "招牌奶茶（大外）", 83, 5205, 3.22, 4.1],
    ["0045", "臺北北醫", "A030003", "招牌奶茶（大熱）", 81, 4255, 3.14, 3.35],
    ["0045", "臺北北醫", "A030003", "招牌奶茶（大外熱）", 75, 4145, 2.91, 3.27],
    ["0045", "臺北北醫", "A030003", "招牌奶茶（中）", 71, 4845, 2.76, 3.82],
    ["0045", "臺北北醫", "A030003", "招牌奶茶（中熱）", 26, 1390, 1.01, 1.1],
    ["0045", "臺北北醫", "A030003", "招牌奶茶（大促）", 26, 1510, 1.01, 1.9],
  ],
};

const Store_BeverageDetail = () => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {DATA.label.map((d, index) => (
            <TableCell align="center" key={index}>
              {d}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {DATA.data.map((d, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {d.map((r, i) => (
              <TableCell align="center" component="th" scope="row" key={i}>
                {r}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default Store_BeverageDetail;
