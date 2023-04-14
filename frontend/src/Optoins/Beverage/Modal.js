import React, { useState } from "react"; //useEffect,
import {
  Button,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DistrictModal = ({ handleModalClose }) => {
  const {
    deleteBeverageCondition,
    addBeverageCondition,
    DATA: { 飲品: DATA },
  } = useCondition();

  const handleBeverageCheck = (name) => (e) => {
    if (e.target.checked) {
      addBeverageCondition(name);
    } else {
      deleteBeverageCondition(name);
    }
  };

  const handleCategoryCheck = (name) => (e) => {};

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
            {Object.keys(DATA).map((category, c_index) => (
              <Box sx={{ minWidth: "120px" }} key={c_index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, flexGrow: 1 }}
                  >
                    {category}
                  </Typography>
                  <Checkbox />
                </Box>
                <Divider />
                <List>
                  {DATA[category].map((b, b_index) => (
                    <ListItem disablePadding key={b_index}>
                      <ListItemText primary={b} sx={{ flexGrow: 1 }} />
                      <Checkbox onClick={handleBeverageCheck(b)} />
                    </ListItem>
                  ))}
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
