import React, { useState } from "react";
import { FormControlLabel, Checkbox, Box, FormGroup } from "@mui/material";
import { useCondition } from "../hooks/useCondition";

export default () => {
  const {
    DATA: { 加料: DATA },
    condition,
    setCondition,
  } = useCondition();
  const [topping, setTopping] = useState(
    DATA.reduce((acc, curr) => {
      acc[curr] = condition.topping.includes(curr);
      return acc;
    }, {})
  );

  const handleToppingClick = (name) => (e) => {
    const { checked } = e.target;
    setTopping((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (checked) {
      setCondition((prev) => ({ ...prev, topping: [...prev.topping, name] }));
    } else {
      setCondition((prev) => ({
        ...prev,
        topping: prev.topping.filter((f) => f !== name),
      }));
    }
  };

  return (
    <Box>
      <FormGroup row>
        {Object.keys(topping).map((f, index) => (
          <FormControlLabel
            value={f}
            labelPlacement="bottom"
            control={
              <Checkbox onClick={handleToppingClick(f)} checked={topping[f]} />
            }
            label={f}
            key={index}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
