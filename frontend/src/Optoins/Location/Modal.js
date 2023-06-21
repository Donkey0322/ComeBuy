import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import { useCondition } from "../../hooks/useCondition";
import Recursive_Component from "./Recursive_Component";

const INDEXFORM = {
  1: "region",
  2: "county",
  3: "district",
  4: "store",
};

function recursive_set(type, data, ...route) {
  if (route.length === 1) {
    console.log(route[0]);
    return {
      ...data,
      [route[0]]:
        route[0].charAt(route[0].length - 1) === "店"
          ? !data[route[0]]
          : { ...data[route[0]], [type]: !data[route[0]][type] },
    };
  } else {
    return {
      ...data,
      [route[0]]: {
        ...data[route[0]],
        children: recursive_set(
          type,
          data[route[0]].children,
          ...route.slice(1)
        ),
      },
    };
  }
}

function recursive_reduce(DATA, chosen, prevState, limit, indexform = 1) {
  if (Array.isArray(DATA)) {
    return DATA.reduce((acc, curr) => {
      if (
        !limit ||
        Boolean(
          limit?.find((e) => e.name === curr && e.index + 1 === indexform)
        )
      ) {
        acc[curr] = chosen.some((e) => e.name === curr);
      }
      return acc;
    }, {});
  } else {
    const key = Object.keys(DATA);
    return key.reduce((acc, curr) => {
      if (
        !limit ||
        Boolean(
          limit?.find((e) => e.name === curr && e.index + 1 === indexform)
        )
      ) {
        acc[curr] = {
          chosen: chosen.some((e) => e.route.includes(curr) || e.name === curr),
          collapsed: prevState?.[curr]?.collapsed ?? false,
          children: recursive_reduce(
            DATA[curr],
            chosen,
            prevState?.[curr]?.children ?? undefined,
            limit,
            indexform + 1
          ),
        };
      }
      return acc;
    }, {});
  }
}
const Search = styled("div")(({ theme }) => ({
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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export default function Modal({ handleModalClose }) {
  let ALLSTORE = [];
  const {
    DATA: { 全台: DATA },
  } = useCondition();

  for (const r of Object.keys(DATA)) {
    for (const c of Object.keys(DATA[r])) {
      if (DATA[r][c]) {
        for (const d of Object.keys(DATA[r][c])) {
          if (DATA[r][c][d]) {
            for (const s of DATA[r][c][d]) {
              ALLSTORE.push([r, c, d, s]);
            }
          } else {
            break;
          }
        }
      } else {
        break;
      }
    }
  }

  const { condition, addLocationCondtion, deleteLocationCondition } =
    useCondition();
  const [location, setLocation] = useState(
    recursive_reduce(DATA, condition.location)
  );
  const [searchWord, setSearchWord] = useState("");
  const [currentRoutes, setCurrentRoutes] = useState(ALLSTORE);
  const [searchingLimit, setSearchingLimit] = useState(undefined);
  /*
  {
    北區: {
      chosen: false,
      collapsed: false,
      childen: {
        新北市: {
          chosen: false,
          collapsed: false,
          childen: {
            新店區: {
              chosen: false,
              collapsed: false,
              children: { "...店": false, "....店": false },
            },
          },
        },
      },
    },
  };
  */

  useEffect(() => {
    setLocation((prev) =>
      recursive_reduce(DATA, condition.location, prev, searchingLimit)
    );
  }, [condition.location]); //已選擇改變時，會藉機改變所有列的狀態

  const handle =
    (shortcut = false) =>
    (type, ...route) =>
    () => {
      setLocation((prev) => recursive_set(type, prev, ...route));
      if (type === "chosen") {
        for (const index in route) {
          let func =
            condition.location.find(
              (e) =>
                (e.name === route[index] &&
                  e.level === INDEXFORM[Number(index) + 1]) ||
                e.route.includes(route[index])
            ) || Number(index) + 1 !== route.length
              ? !shortcut || Number(index) + 1 !== route.length
                ? deleteLocationCondition
                : () => {}
              : addLocationCondtion;

          func(route[index], INDEXFORM[Number(index) + 1], route.slice(0, -1));
          if (
            !(
              condition.location.find(
                (e) =>
                  (e.name === route[index] &&
                    e.level === INDEXFORM[Number(index) + 1]) ||
                  e.route.includes(route[index])
              ) || Number(index) + 1 !== route.length
            )
          ) {
            console.log(route[index]);
          }
        }
      }
    };

  const AllClick = (ROUTE) => () => {
    if (ROUTE) {
      let tmp = [];
      for (const store of currentRoutes) {
        if (
          store.join(",").includes(ROUTE.join(",")) &&
          !tmp.includes(store.slice(0, ROUTE.length + 1).join(","))
        ) {
          handle(true)("chosen", ...store.slice(0, ROUTE.length + 1))();
          tmp.push(store.slice(0, ROUTE.length + 1).join(","));
        }
      }
    } else {
      for (const store of currentRoutes) {
        console.log(store);
        handle(true)("chosen", ...store)();
      }
    }
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      let tmp = [];
      for (const store of ALLSTORE) {
        if (store.some((e) => e.includes(searchWord))) {
          tmp.push(store);
        }
      }
      setCurrentRoutes(tmp);
      if (tmp.length) {
        const limit = tmp
          .map((m) => m.map((t, index) => ({ name: t, index })))
          .flat()
          .filter(
            (item, index, inputArray) =>
              inputArray.findIndex(
                (i) => i.name === item.name && i.index === item.index
              ) === index
          );
        setSearchingLimit(limit);
        setLocation((prev) =>
          recursive_reduce(DATA, condition.location, prev, limit)
        );
        setSearchWord("");
      }
    }
  };
  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ position: "relative" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={handleModalClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            地區
          </Typography>
          <Search onKeyDown={handleSearchEnter}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchWord}
              onChange={handleSearchChange}
            />
          </Search>
          <Button
            autoFocus
            color="warning"
            variant="contained"
            onClick={AllClick()}
            sx={{ position: "absolute", right: 0, mr: 2 }}
          >
            <Typography variant="h7">全門市選取</Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      <Recursive_Component
        data={location}
        DATA_INDEX={[]}
        handle={handle()}
        AllClick={AllClick}
      />
    </Box>
  );
}
