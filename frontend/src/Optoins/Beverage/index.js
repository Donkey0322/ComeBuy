import React, { useState } from "react";
import { FormLabel, Button, Dialog, Slide, Box, Chip } from "@mui/material";
import { useCondition } from "../../hooks/useCondition";
import LocalDrinkRoundedIcon from "@mui/icons-material/LocalDrinkRounded";
import Modal from "./Modal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DistrictModal = () => {
  const [open, setOpen] = useState(false);
  const { condition, deleteBeverageCondition } = useCondition();

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button sx={{ ml: -1 }} size="large" onClick={() => setOpen(true)}>
        全品項
      </Button>
      <FormLabel sx={{ mt: 2 }} component="legend">
        已選擇
      </FormLabel>
      <Box
        direction="row"
        spacing={1}
        sx={{
          mt: 1,
          borderColor: "divider",
          borderWidth: "1px",
          minHeight: "100px",
          width: "100%",
          minWidth: "400px",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2vmin",
          p: 1,
        }}
      >
        {condition.beverage.map((b, index) => (
          <Chip
            key={index}
            label={b.name}
            onDelete={() => {
              deleteBeverageCondition(b.name);
            }}
            name={b.name}
            icon={<LocalDrinkRoundedIcon />}
            // color={checkValidCondition() ? "default" : c.level}
          />
        ))}
      </Box>
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
export default DistrictModal;
