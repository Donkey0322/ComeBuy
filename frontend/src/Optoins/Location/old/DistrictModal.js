import React, { useEffect, useState } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Chip,
  Button,
  Dialog,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Collapse,
  Slide,
} from "@mui/material";
import { useCondition } from "../../../hooks/useCondition";
import CloseIcon from "@mui/icons-material/Close";
import StoreIcon from "@mui/icons-material/Store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DistrictModal = ({
  open,
  setOpen,
  countyFocus,
  modalData,
  districtData,
}) => {
  const countyKey = Object.keys(modalData);
  const { district, setDistrict, store, setStore } = districtData;
  const { condition, addLocationCondtion, deleteLocationCondition } =
    useCondition();

  useEffect(() => {
    if (countyKey.length > 0 && store.length === 0 && open) {
      setDistrict(
        countyKey.reduce(
          (acc, curr) => (
            (acc[curr] = {
              checked: Boolean(condition.location.find((e) => e.name === curr)),
              focused: false,
            }),
            acc
          ),
          {}
        )
      );
      setStore(
        countyKey.map((m) =>
          modalData[m].reduce(
            (acc, curr) => (
              (acc[curr] = Boolean(
                condition.location.find((e) => e.name === curr)
              )),
              acc
            ),
            {}
          )
        )
      );
    }
  }, [countyKey, modalData, store, open]);

  const handleDistrictCheck = (name) => () => {
    if (district[name].checked) {
      deleteLocationCondition(name, "district");
    } else {
      addLocationCondtion(name, "district");
    }
    setDistrict((prev) => ({
      ...prev,
      [name]: { ...prev[name], checked: !prev[name].checked },
    }));
  };

  const handleDistrictFocus = (name) => () => {
    setDistrict((prev) => ({
      ...prev,
      [name]: { ...prev[name], focused: !prev[name].focused },
    }));
  };
  const handleStoreClick = (name, index) => () => {
    if (store[index][name]) {
      deleteLocationCondition(name, "store", index);
    } else {
      addLocationCondtion(name, "store", index);
    }
    setStore((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [name]: !p[name] } : p))
    );
  };
  const handleModalClose = () => {
    setOpen(false);
    setStore([]);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleModalClose}
      TransitionComponent={Transition}
      // sx={{ width: "60%" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {countyFocus}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleModalClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {Object.keys(district).map(
          (
            d, //d是松山區
            index
          ) => (
            <div key={index}>
              <ListItem>
                <FormControlLabel
                  control={
                    <Button
                      size="large"
                      variant={district[d].focused ? "contained" : "outlined"}
                      onClick={handleDistrictFocus(d)}
                    >
                      {d}
                    </Button>
                  }
                />
              </ListItem>
              <Collapse in={district[d].focused} unmountOnExit sx={{ ml: 1 }}>
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
      </List>
    </Dialog>
  );
};
export default DistrictModal;
