import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCondition } from "../hooks/useCondition";

const SORTFUNC = (a, b) => a.length - b.length || a.localeCompare(b);

const Topping = () => {
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

  useEffect(() => {
    setTopping(
      DATA.reduce((acc, curr) => {
        acc[curr] = condition.topping.includes(curr);
        return acc;
      }, {})
    );
  }, [condition.topping]);

  return (
    <Box>
      <FormGroup row>
        {Object.keys(topping)
          .sort(SORTFUNC)
          .map((f, index) => (
            <FormControlLabel
              value={f}
              labelPlacement="bottom"
              control={
                <Checkbox
                  onClick={handleToppingClick(f)}
                  checked={topping[f]}
                  color="secondary"
                />
              }
              label={f}
              key={index}
            />
          ))}
      </FormGroup>
    </Box>
  );
};

export default Topping;
