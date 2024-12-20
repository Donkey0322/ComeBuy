import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Chip,
  Dialog,
  FormLabel,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useCondition } from "../../hooks/useCondition";
import Modal from "./Modal";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    region: {
      main: "#ba68c8",
      contrastText: "#fff",
    },
    county: {
      main: "#ff9800",
      contrastText: "#fff",
    },
    district: {
      main: "#03a9f4",
      contrastText: "#fff",
    },
    store: {
      main: "#4caf50",
      contrastText: "#fff",
    },
    neutral: {
      main: "#4caf50",
      contrastText: "#fff",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function HelperText({ color, children }) {
  return (
    <Typography color={color} variant="caption">
      {children}
    </Typography>
  );
}

HelperText.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

HelperText.defaultProps = {
  color: "default",
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };
  const { condition, deleteLocationCondition, setCondition } = useCondition();

  const checkValidCondition = () => {
    const level = condition.location?.[0]?.level;
    return level ? condition.location.every((e) => e.level === level) : true;
  };

  return (
    <Box>
      <Button sx={{ ml: -1 }} size="large" onClick={() => setOpen(true)}>
        全台
      </Button>
      <FormLabel sx={{ mt: 2 }} component="legend">
        已選擇
      </FormLabel>
      <Box
        direction="row"
        spacing={1}
        sx={{
          mt: 1,
          borderColor: checkValidCondition() ? "divider" : "#d32f2f",
          borderWidth: "1px",
          minHeight: "100px",
          width: "100%",
          minWidth: "400px",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2vmin",
          p: 1,
          position: "relative",
        }}
      >
        {Boolean(
          condition.location.filter((m) => m.name !== "全台").length
        ) && (
          <IconButton
            sx={{ position: "absolute", right: -20, top: -20 }}
            onClick={() => setCondition((prev) => ({ ...prev, location: [] }))}
          >
            <CancelIcon fontSize="inherit" color="error" />
          </IconButton>
        )}
        {condition.location.map((c, index) => (
          <ThemeProvider theme={theme} key={index}>
            <Chip
              label={c.name}
              onDelete={
                c.name !== "全台"
                  ? () => deleteLocationCondition(c.name, c.level)
                  : undefined
              }
              name={c.name}
              color={checkValidCondition() ? "default" : c.level}
            />
          </ThemeProvider>
        ))}
      </Box>
      {!checkValidCondition() && (
        <HelperText color="error" children={"請選擇相同層級的地區"} />
      )}
      <Dialog
        open={open}
        onClose={handleModalClose}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="md"
      >
        <Modal handleModalClose={handleModalClose} />
      </Dialog>
    </Box>
  );
};
export default Index;
