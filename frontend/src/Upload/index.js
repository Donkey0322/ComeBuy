import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const SIEVE = {
  store: "地區",
  category: "品項種類",
  drink: "品項",
  sweet: "甜度",
  ice: "冰塊",
  taste: "口味",
  topping: "加料",
};

const LABEL = {
  store: ["區域", "縣市", "地方區域", "分店名稱"],
  category: ["品項種類名稱"],
  drink: ["品項種類", "品項名稱"],
  sweet: ["甜度名稱"],
  ice: ["冰塊名稱"],
  taste: ["口味名稱"],
  topping: ["加料名稱"],
};

const Upload = () => {
  const [sieve, setSieve] = useState("");
  const [data, setData] = useState(["", "", "", ""]);
  const [send, setSend] = useState(false);

  const handleSieveChange = (e) => {
    setData(["", "", "", ""]);
    const { value } = e.target;
    setSieve(value);
  };

  const handleDataChange = (index) => (e) => {
    const { value } = e.target;
    setData((prev) => prev.with(index, value));
  };

  const handleSaveClick = async () => {
    if (!send) setSend(true);
    else return;
    console.log({
      [sieve]:
        LABEL[sieve].length === 1
          ? data[0]
          : data.slice(0, LABEL[sieve].length),
    });
  };

  return (
    <Box sx={{ my: 1, ml: 1, display: "flex", flexDirection: "column" }}>
      <List
        sx={{
          mt: 1,
          width: "90%",
          bgcolor: "background.paper",
        }}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            操作系統
          </ListSubheader>
        }
      >
        <ListItem sx={{ width: 250 }}>
          <FormControl fullWidth>
            <InputLabel>篩選條件</InputLabel>
            <Select value={sieve} label="篩選條件" onChange={handleSieveChange}>
              {Object.keys(SIEVE).map((s, index) => (
                <MenuItem value={s} key={index}>
                  {SIEVE[s]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
        {sieve &&
          LABEL[sieve].map((l, index) => (
            <ListItem sx={{ width: 250 }} key={index}>
              <TextField
                label={l}
                variant="outlined"
                value={data[index]}
                onChange={handleDataChange(index)}
              />
            </ListItem>
          ))}

        <ListItem sx={{ width: 250 }}>
          <LoadingButton
            loading={send}
            loadingPosition="start"
            startIcon={
              <SaveIcon
                sx={{ visibility: "hidden", display: send ? "block" : "none" }}
              />
            }
            disabled={
              sieve ? data.slice(0, LABEL[sieve].length).some((e) => !e) : true
            }
            variant="contained"
            onClick={handleSaveClick}
          >
            Save
          </LoadingButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Upload;
