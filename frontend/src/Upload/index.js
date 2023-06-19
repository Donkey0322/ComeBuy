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

const Upload = () => {
  const [sieve, setSieve] = useState("");
  const [data, setData] = useState(["", "", "", ""]);
  const [newData, setNewData] = useState(["", "", "", ""]);
  const [send, setSend] = useState(false);
  let { DATA } = useCondition();

  DATA = { ...DATA, store: DATA["全台"], drink: DATA["飲品"] };

  const FetchMenu = (index) => {
    let element = DATA[sieve];
    for (let i = 0; i < index; i++) {
      element = element[data[i]];
    }
    return Object.keys(element);
  };

  const handleSieveChange = (e) => {
    setData(["", "", "", ""]);
    setNewData(["", "", "", ""]);
    const { value } = e.target;
    setSieve(value);
  };

  const handleDataChange = (index) => (e) => {
    const { value } = e.target;
    setData((prev) => [
      ...prev.with(index, value).slice(0, index + 1),
      ...new Array(3 - index).fill([""]).flat(),
    ]);
  };

  const handleNewDataChange = (index) => (e) => {
    const { value } = e.target;
    setNewData((prev) => prev.with(index, value));
  };

  const handleSaveClick = async () => {
    if (!send) setSend(true);
    else return;
    console.log({
      [sieve]:
        LABEL[sieve].length === 1
          ? data[0]
          : data
              .slice(0, LABEL[sieve].length)
              .map((m, index) => (m && m !== "其他" ? m : newData[index])),
    });
  };

  const checkValidation = (index) => {
    let error = false;
    let helperText = "";
    switch (sieve) {
      case "store":
        if (
          index === 3 &&
          !data[index].includes("店") &&
          !newData[index].includes("店")
        ) {
          error = true;
          helperText = "輸入請包涵'店'";
        }
      case "drink":
        if (
          newData.slice(0, index).every((e) => !e) &&
          FetchMenu(index).includes(newData[index])
        ) {
          error = true;
          helperText = "你輸入了選單內的選項，請從選項中選取。";
        }
        break;
      default:
        break;
    }
    return { error, helperText };
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
          LABEL[sieve].map((l, index, array) => {
            let prop = {
              label: l,
              variant: "outlined",
              value: data[index],
              onChange: handleDataChange(index),
            };
            let newProp = {
              label: l,
              variant: "outlined",
              value: newData[index],
              onChange: handleNewDataChange(index),
            };
            let Component =
              array.length > 1 ? (
                (index === 0 ||
                  (data[index - 1] && data[index - 1] !== "其他") ||
                  newData[index - 1]) &&
                (data.slice(0, index)?.includes("其他") ? (
                  <TextField
                    {...newProp}
                    {...checkValidation(index)}
                    sx={{ width: 250 }}
                  />
                ) : array.length === index + 1 ? (
                  <TextField
                    {...prop}
                    {...checkValidation(index)}
                    sx={{ width: 250 }}
                  />
                ) : (
                  <Box sx={{ display: "flex", columnGap: 1 }}>
                    <FormControl sx={{ width: 250 }}>
                      <InputLabel>{l}</InputLabel>
                      <Select {...prop}>
                        {FetchMenu(index).map((s, index) => (
                          <MenuItem value={s} key={index}>
                            {s}
                          </MenuItem>
                        ))}
                        <MenuItem value="其他">其他</MenuItem>
                      </Select>
                    </FormControl>
                    {data[index] === "其他" && (
                      <TextField {...newProp} {...checkValidation(index)} />
                    )}
                  </Box>
                ))
              ) : (
                <TextField {...prop} />
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
            disabled={
              sieve
                ? data
                    .slice(0, LABEL[sieve].length)
                    .map((m, index) => (m && m !== "其他" ? m : newData[index]))
                    .some((e) => !e)
                : true
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
