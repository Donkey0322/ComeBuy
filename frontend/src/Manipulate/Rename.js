import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useCondition } from "../hooks/useCondition";

const SIEVE = {
  store: "地區",
  drink: "品項",
  sweet: "甜度",
  ice: "冰塊",
  taste: "口味",
  topping: "加料",
};

const LABEL = {
  store: ["區域", "縣市", "地方區域", "分店名稱"],
  drink: ["品項種類", "品項名稱"],
  sweet: ["甜度名稱"],
  ice: ["冰塊名稱"],
  taste: ["口味名稱"],
  topping: ["加料名稱"],
};

export default function Rename() {
  const [sieve, setSieve] = useState("");
  const [data, setData] = useState(Array(4).fill({ value: "", new: "" }));
  const [send, setSend] = useState(false);
  const [error, setError] = useState(false);
  let { DATA } = useCondition();

  DATA = { ...DATA, store: DATA["全台"], drink: DATA["飲品"] };

  const FetchMenu = (index) => {
    let element = DATA[sieve];
    for (let i = 0; i < index; i++) {
      element = element[data[i].value];
    }
    return Array.isArray(element) ? element : Object.keys(element);
  };

  const checkValidation = (index, value = undefined) => {
    let error = false;
    let helperText = "";
    switch (sieve) {
      case "store":
        if (
          index === 3 &&
          (value ?? data[index].new).charAt(
            (value ?? data[index].new).length - 1
          ) === "店"
        ) {
          error = true;
          helperText = "結尾請不要輸入'店'";
        }
      case "drink":
        if (
          data
            .map((m) => m.new)
            .slice(0, index)
            .every((e) => !e) &&
          FetchMenu(index).includes(value ?? data[index].new)
        ) {
          error = true;
          helperText = "你輸入了選單內的選項，請從選項中選取。";
        }
        break;
    }
    return { error, helperText };
  };

  const handleSieveChange = ({ target: { value } }) => {
    setData(Array(4).fill({ value: "", new: "" }));
    setSieve(value);
  };
  const handleDataChange =
    (index, target = "value") =>
    ({ target: { value } }) => {
      setData((prev) => [
        ...prev
          .with(index, {
            ...prev[index],
            [target]: value,
          })
          .slice(0, index + 1),
        ...Array(3 - index).fill({ value: "", new: "" }),
      ]);
      if (target === "new" || error)
        setError(checkValidation(index, value).error);
    };

  const handleSaveClick = async () => {
    if (!send) setSend(true);
    else return;
    // console.log({
    //   [sieve]:
    //     LABEL[sieve].length === 1
    //       ? data[0]
    //       : data
    //           .slice(0, LABEL[sieve].length)
    //           .map((m, index) => (m && m !== "其他" ? m : newData[index])),
    // });
  };

  const handleSelectCancel = (index) => () => {
    setData((prev) => [
      ...prev.slice(0, index),
      ...Array(4 - index).fill({ value: "", new: "" }),
    ]);
  };

  return (
    <List sx={{ py: 0 }}>
      <ListItem>
        <FormControl sx={{ width: 250 }}>
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
        LABEL[sieve].map((l, index) => {
          let prop = {
            label: l,
            variant: "outlined",
            onChange: handleDataChange(index),
          };
          let show = index === 0 || data[index - 1].new;
          let Component = show && (
            <Box
              sx={{
                display: "flex",
                columnGap: 1,
              }}
            >
              <FormControl sx={{ width: 250 }}>
                <InputLabel>{l}</InputLabel>
                <Select
                  {...prop}
                  value={data[index].value}
                  onOpen={handleSelectCancel(index)}
                >
                  {FetchMenu(index).map((s, index) => (
                    <MenuItem value={s} key={index}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {data[index].value && (
                <TextField
                  {...prop}
                  {...checkValidation(index)}
                  value={data[index].new}
                  onChange={handleDataChange(index, "new")}
                  InputProps={{
                    endAdornment: index === 3 && (
                      <InputAdornment position="end">店</InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>
          );
          return (
            Component && (
              <ListItem sx={{ minWidth: 250 }} key={index}>
                {Component}
              </ListItem>
            )
          );
        })}
      <ListItem sx={{ width: 250 }}>
        <LoadingButton
          loading={send}
          loadingPosition="start"
          startIcon={
            <SaveIcon
              sx={{ visibility: "hidden", display: send ? "block" : "none" }}
            />
          }
          disabled={error || data.some((m) => m.value && !m.new)}
          variant="contained"
          onClick={handleSaveClick}
        >
          Save
        </LoadingButton>
      </ListItem>
    </List>
  );
}
