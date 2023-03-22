import React, { useState } from "react"; //useEffect,
import {
  FormControlLabel,
  Button,
  Dialog,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Collapse,
  Slide,
} from "@mui/material";
// import { useCondition } from "../../hooks/useCondition";
import CloseIcon from "@mui/icons-material/Close";
// import StoreIcon from "@mui/icons-material/Store";
import DATA from "./beverage.json";
import Test from "./test";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DistrictModal = () => {
  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{ ml: -1 }} size="large" onClick={() => setOpen(true)}>
        全品項
      </Button>
      <Dialog
        open={open}
        onClose={handleModalClose}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="md"
      >
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
        {Object.keys(DATA).map(
          (
            d, //d是松山區
            index
          ) => (
            <List key={index}>
              <ListItem>
                <FormControlLabel
                  control={
                    <Button
                      variant="outlined"
                      // variant={district[d].focused ? "contained" : "outlined"}
                      // onClick={handleDistrictFocus(d)}
                    >
                      {d}
                    </Button>
                  }
                />
                {/* <ListItemButton></ListItemButton> */}
              </ListItem>
              <ListItem>
                <Collapse in={true}>
                  <Test data={DATA[d]} />
                </Collapse>
              </ListItem>
            </List>
          )
        )}
        {/* <List>
        {Object.keys(district).map(
          (
            d, //d是松山區
            index
          ) => (
            <div key={index}>
              <ListItem>
                <FormControlLabel
                  control={
                    <>
                      <Checkbox
                        checked={district[d].checked}
                        onChange={handleDistrictCheck(d)}
                        name={d}
                      />
                      <Button
                        variant={district[d].focused ? "contained" : "outlined"}
                        onClick={handleDistrictFocus(d)}
                      >
                        {d}
                      </Button>
                    </>
                  }
                />
              </ListItem>
              <Collapse in={district[d].focused} unmountOnExit sx={{ ml: 6 }}>
                <Box
                  direction="row"
                  spacing={1}
                  sx={{
                    borderColor: "divider",
                    borderWidth: "1px",
                    width: "30%",
                    borderRadius: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2vmin",
                    p: 1,
                  }}
                >
                  {store.length > 0 &&
                    Object.keys(store[index]).map((s, i) => (
                      <Chip
                        onClick={handleStoreClick(s, index)}
                        icon={<StoreIcon />}
                        label={s}
                        key={i}
                        color={store[index][s] ? "primary" : "default"}
                      />
                    ))}
                </Box>
              </Collapse>
              <Divider />
            </div>
          )
        )}
      </List> */}
      </Dialog>
    </>
  );
};
export default DistrictModal;
