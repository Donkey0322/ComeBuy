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
  InputBase,
} from "@mui/material";
import { styled as MuiStyled, alpha } from "@mui/material/styles";
import { useCondition } from "../../hooks/useCondition";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

const Search = MuiStyled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = MuiStyled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = MuiStyled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
  const [searchWord, setSearchWord] = useState("");
  const [searchingLimit, setSearchingLimit] = useState(undefined);

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

  const handleSearchEnter = (e) => {
    // if (e.key === "Enter") {
    //   let tmp = [];
    //   for (const store of ALLSTORE) {
    //     if (store.some((e) => e.includes(searchWord))) {
    //       tmp.push(store);
    //     }
    //   }
    //   setCurrentRoutes(tmp);
    //   if (tmp.length) {
    //     const limit = tmp
    //       .map((m) => m.map((t, index) => ({ name: t, index })))
    //       .flat()
    //       .filter(
    //         (item, index, inputArray) =>
    //           inputArray.findIndex(
    //             (i) => i.name === item.name && i.index === item.index
    //           ) === index
    //       );
    //     setSearchingLimit(limit);
    //     setLocation((prev) =>
    //       recursive_reduce(DATA, condition.location, prev, limit)
    //     );
    //     setSearchWord("");
    //   }
    // }
  };

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <>
      <AppBar sx={{ position: "static", backgroundColor: "#099B91" }}>
        <Toolbar sx={{ position: "relative" }}>
          <IconButton edge="start" color="inherit" onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ mr: 2 }} variant="h6" component="div" noWrap>
            品項
          </Typography>
          {/* <Search onKeyDown={handleSearchEnter}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchWord}
              onChange={handleSearchChange}
            />
          </Search> */}
          <Button
            autoFocus
            color="inherit"
            onClick={handleModalClose}
            sx={{ position: "absolute", right: 0, mr: 2 }}
          >
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
