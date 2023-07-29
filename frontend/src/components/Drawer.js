import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Divider,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Fragment } from "react";
import { useCondition } from "../hooks/useCondition";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function CbDrawer({
  open,
  setOpen,
  showType,
  setShowType,
  graphType,
  setGraphType,
  calType,
  setCalType,
  constraint,
  setConstraint,
  constraints,
}) {
  const theme = useTheme();
  const { systemState } = useCondition();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = ({ target: { value } }) => {
    setConstraint(value);
  };

  const DrawerItems = {
    ...(constraint && {
      額外條件: (
        <FormControl fullWidth>
          <Select value={constraint} onChange={handleMenuItemClick}>
            {constraints.map((value, index) => (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    }),
    ...(showType && {
      數值類別: (
        <FormControl fullWidth>
          <Select
            value={showType}
            onChange={({ target: { value } }) => {
              setShowType(value);
            }}
          >
            {["杯數", "杯數佔比", "金額", "金額佔比"].map((value, index) => (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    }),
    ...(graphType && {
      圖類: (
        <ToggleButtonGroup
          value={graphType}
          onChange={(_, newV) => {
            if (newV) {
              setGraphType(newV);
            }
          }}
          exclusive
          disabled={systemState.part}
        >
          <ToggleButton value="長條圖">長條圖</ToggleButton>
          <ToggleButton value="折線圖">折線圖</ToggleButton>
        </ToggleButtonGroup>
      ),
    }),
    ...(calType && {
      計算方式: (
        <ToggleButtonGroup
          value={calType}
          onChange={(_, newV) => {
            if (newV) {
              setCalType(newV);
            }
          }}
          exclusive
          disabled={systemState.part}
        >
          <ToggleButton value="分開計算">分開計算</ToggleButton>
          <ToggleButton value="合併計算">合併計算</ToggleButton>
        </ToggleButtonGroup>
      ),
    }),
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          position: "absolute",
          boxShadow: "rgba(0, 0, 0, 0.15) -1.95px 1.95px 10px",
        },
        display: !open && "none",
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {Object.keys(DrawerItems).map((header, index) => (
        <Fragment key={index}>
          <List subheader={<ListSubheader>{header}</ListSubheader>}>
            <ListItem disablePadding sx={{ px: "16px" }}>
              {DrawerItems[header]}
            </ListItem>
          </List>
          <Divider />
        </Fragment>
      ))}
    </Drawer>
  );
}
