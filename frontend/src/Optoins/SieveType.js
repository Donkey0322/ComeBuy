import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Switch,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";
import { useCondition } from "../hooks/useCondition";
import Beverage from "./Beverage";
import Flavor from "./Flavor";
import Ice from "./Ice";
import Location from "./Location";
import Sweet from "./Sweet";
import Time from "./Time";
import Topping from "./Topping";

const KEYMAP = {
  甜度: "sweet",
  冰塊: "ice",
  口味: "flavor",
  加料: "topping",
};

const SieveType = () => {
  const [sieveType, setSieveType] = useState({
    時間: { focused: false, child: <Time />, image: "time" },
    地區: {
      focused: false,
      child: <Location />,
      image: "location",
    },
    品項: { focused: false, child: <Beverage />, image: "drink" },
    甜度: { focused: false, child: <Sweet />, image: "sweet", shortcut: false },
    冰塊: { focused: false, child: <Ice />, image: "ice", shortcut: false },
    口味: {
      focused: false,
      child: <Flavor />,
      image: "flavor",
      shortcut: false,
    },
    加料: {
      focused: false,
      child: <Topping />,
      image: "topping",
      shortcut: false,
    },
  });
  const {
    condition: { part, ice, sweet, flavor, topping },
    setCondition,
    DATA,
  } = useCondition();

  const handleSieveClick = (name) => () => {
    setSieveType((prev) => ({
      ...prev,
      [name]: { ...prev[name], focused: !prev[name].focused },
    }));
  };

  return (
    <List
      sx={{
        ml: 1,
        mt: 1,
        width: "98%",
        // maxWidth: 360,
        bgcolor: "background.paper",
      }}
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          篩選條件
        </ListSubheader>
      }
    >
      {Object.keys(sieveType).map((s, index) => {
        const { image, focused, shortcut, child } = sieveType[s];
        return (
          <Box key={index}>
            <ListItemButton
              key={index}
              onClick={handleSieveClick(s)}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {image && (
                <img
                  src={require(`./assets/${image}.${focused ? "gif" : "png"}`)}
                  alt=""
                  width={focused ? 28 : 26}
                />
              )}
              <ListItemText
                sx={{ ml: 1 }}
                primaryTypographyProps={{ fontWeight: 600 }}
              >
                {s}
              </ListItemText>
              {focused && shortcut !== undefined && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCondition((prev) => ({
                      ...prev,
                      [KEYMAP[s]]: shortcut ? [] : DATA[s],
                    }));
                    setSieveType((prev) => ({
                      ...prev,
                      [s]: { ...prev[s], shortcut: !prev[s].shortcut },
                    }));
                  }}
                  variant={shortcut ? "outlined" : "contained"}
                >
                  {shortcut ? "一鍵取消" : "一鍵全選"}
                </Button>
              )}
            </ListItemButton>
            <Collapse
              in={Boolean(focused && child)}
              unmountOnExit
              sx={{ width: "100%" }}
            >
              <List component="div" disablePadding>
                <ListItem>{child}</ListItem>
              </List>
            </Collapse>
          </Box>
        );
      })}
      <ListItem
        style={{
          display:
            !ice.length &&
            !sweet.length &&
            !flavor.length &&
            !topping.length &&
            "none",
        }}
      >
        <Zoom
          in={Boolean(
            ice.length || sweet.length || flavor.length || topping.length
          )}
        >
          <FormControlLabel
            control={
              <Switch
                checked={part}
                onChange={() =>
                  setCondition((prev) => ({ ...prev, part: !prev.part }))
                }
              />
            }
            label="分別飲品統整"
          />
        </Zoom>
      </ListItem>
    </List>
  );
};

export default SieveType;
