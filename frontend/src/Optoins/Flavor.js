import React, { useState } from "react";
import { FormControlLabel, Checkbox, Box, FormGroup } from "@mui/material";
import { useCondition } from "../hooks/useCondition";

export default () => {
  const {
    DATA: { 口味: DATA },
    condition,
    setCondition,
  } = useCondition();
  const [flavor, setFlavor] = useState(
    DATA.reduce((acc, curr) => {
      acc[curr] = condition.flavor.includes(curr);
      return acc;
    }, {})
  );

  const handleFlavorClick = (name) => (e) => {
    const { checked } = e.target;
    setFlavor((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (checked) {
      setCondition((prev) => ({ ...prev, flavor: [...prev.flavor, name] }));
    } else {
      setCondition((prev) => ({
        ...prev,
        flavor: prev.flavor.filter((f) => f !== name),
      }));
    }
  };

  return (
    <Box>
      <FormGroup row>
        {Object.keys(flavor).map((f, index) => (
          <FormControlLabel
            value={f}
            labelPlacement="bottom"
            control={
              <Checkbox onClick={handleFlavorClick(f)} checked={flavor[f]} />
            }
            label={f}
            key={index}
          />
        ))}
      </FormGroup>
    </Box>
  );
};
