import React from "react";
import {
  Box,
  Chip,
  Button,
  ListItem,
  List,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StoreIcon from "@mui/icons-material/Store";
import { useCondition } from "../../hooks/useCondition";

const Recusive_Component = ({ DATA_INDEX, data, handle, AllClick }) => {
  if (data[Object.keys(data)[0]].chosen === undefined) {
    return (
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
          ml: 1,
          mb: 1,
        }}
      >
        {Object.keys(data).map((s, i) => (
          <Chip
            onClick={handle("chosen", ...DATA_INDEX, s)}
            icon={<StoreIcon />}
            label={s}
            key={i}
            color={data[s] ? "primary" : "default"}
          />
        ))}
      </Box>
    );
  } else {
    return (
      <List>
        {Object.keys(data).map((d, index) => (
          <div key={index}>
            <ListItem>
              <Button
                variant={data[d].chosen ? "contained" : "outlined"}
                onClick={handle("chosen", ...DATA_INDEX, d)}
                // disableRipple={true}
              >
                {d}
              </Button>
              <IconButton onClick={handle("collapsed", ...DATA_INDEX, d)}>
                {data[d].collapsed ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              {data[d].collapsed && (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: "50px",
                    right: 0,
                    position: "absolute",
                    mr: 5,
                  }}
                  onClick={AllClick([...DATA_INDEX, d])}
                >
                  一鍵全選
                </Button>
              )}
            </ListItem>
            <Collapse in={data[d].collapsed} unmountOnExit sx={{ ml: 1 }}>
              <Recusive_Component
                DATA_INDEX={[...DATA_INDEX, d]}
                data={data[d].children}
                handle={handle}
                AllClick={AllClick}
              />
            </Collapse>
            <Divider />
          </div>
        ))}
      </List>
    );
  }
};

export default Recusive_Component;
