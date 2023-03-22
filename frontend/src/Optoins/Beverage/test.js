import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid({ data }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} columns={12}>
        {data.map((d, index) => (
          <Grid item xs={2} sm={2} md={2} key={index}>
            <Item>{d}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
