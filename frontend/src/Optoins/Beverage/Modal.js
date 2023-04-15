import React, { useEffect, useState } from "react";
import {
  Button,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  ListItemText,
  Divider,
  Checkbox,
  DialogContent,
} from "@mui/material";
import { useCondition } from "../../hooks/useCondition";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  column-gap: 60px;
`;

const DistrictModal = ({ handleModalClose }) => {
  const {
    deleteBeverageCondition,
    addBeverageCondition,
    DATA: { 飲品: DATA },
    condition: { beverage },
  } = useCondition();

  const checkCheckedOrIndeterminate = (object) => {
    let temp = { ...object };
    for (const category of Object.keys(temp)) {
      temp[category].checked = Object.values(temp[category].beverages).every(
        (e) => e
      );
      temp[category].indeterminate =
        Object.values(temp[category].beverages).some((e) => e) &&
        !Object.values(temp[category].beverages).every((e) => e);
    }
    return temp;
  };

  const dataFormatProcessing = (rawData, chosen) => {
    let result = Object.keys(rawData).reduce((acc, curr) => {
      acc[curr] = {
        beverages: rawData[curr].reduce((accb, currb) => {
          accb[currb] = chosen.some((e) => e.name === currb);
          return accb;
        }, {}),
      };
      return acc;
    }, {});
    return checkCheckedOrIndeterminate(result);
  };
  const [beverages, setBeverages] = useState(
    dataFormatProcessing(DATA, beverage)
  );

  const handleBeverageCheck = (name, category) => (e) => {
    const { checked } = e.target;
    if (checked) {
      addBeverageCondition(name, category);
    } else {
      deleteBeverageCondition(name);
    }
    setBeverages((prev) =>
      checkCheckedOrIndeterminate({
        ...prev,
        [category]: {
          ...prev[category],
          beverages: {
            ...prev[category].beverages,
            [name]: checked,
          },
        },
      })
    );
  };

  useEffect(() => {
    setBeverages(dataFormatProcessing(DATA, beverage));
  }, []);
  /*
  '冷泡茶': {
    checked: false,
    beverages: { '四季春(冷泡茶)': false, '蜜香紅茶(冷泡茶)': false, '東方美人(冷泡茶)': false }
  }
  */

  const handleCategoryCheck = (category) => (e) => {
    const { checked } = e.target;
    if (checked) {
      addBeverageCondition(
        Object.keys(beverages[category].beverages),
        category
      );
    } else {
      deleteBeverageCondition(Object.keys(beverages[category].beverages));
    }
    setBeverages((prev) =>
      checkCheckedOrIndeterminate({
        ...prev,
        [category]: {
          ...prev[category],
          beverages: Object.keys(prev[category].beverages).reduce(
            (acc, curr) => {
              acc[curr] = checked;
              return acc;
            },
            {}
          ),
        },
      })
    );
  };

  return (
    <>
      <AppBar sx={{ position: "relative", backgroundColor: "#099B91" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            品項
          </Typography>
          <Button autoFocus color="inherit" onClick={handleModalClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box sx={{ height: "60vh", display: "flex" }}>
          <Menu>
            {Object.keys(beverages).map((category, c_index) => (
              <Box sx={{ minWidth: "120px" }} key={c_index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, flexGrow: 1 }}
                  >
                    {category}
                  </Typography>
                  <Checkbox
                    checked={beverages[category].checked}
                    indeterminate={beverages[category].indeterminate}
                    onClick={handleCategoryCheck(category)}
                  />
                </Box>
                <Divider />
                <List>
                  {Object.keys(beverages[category].beverages).map(
                    (b, b_index) => (
                      <ListItem disablePadding key={b_index}>
                        <ListItemText primary={b} sx={{ flexGrow: 1 }} />
                        <Checkbox
                          onClick={handleBeverageCheck(b, category)}
                          checked={beverages[category].beverages[b]}
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            ))}
          </Menu>
        </Box>
      </DialogContent>
    </>
  );
};
export default DistrictModal;
