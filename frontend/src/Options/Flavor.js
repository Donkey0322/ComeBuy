import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCondition } from "../hooks/useCondition";

const SORTFUNC = (a, b) => a.length - b.length || a.localeCompare(b);

export default function Flavor() {
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

  useEffect(() => {
    setFlavor(
      DATA.reduce((acc, curr) => {
        acc[curr] = condition.flavor.includes(curr);
        return acc;
      }, {})
    );
  }, [condition.flavor, DATA]);

  return (
    <Box>
      <FormGroup row>
        {Object.keys(flavor)
          .sort(SORTFUNC)
          .map((f, index) => (
            <FormControlLabel
              value={f}
              labelPlacement="bottom"
              control={
                <Checkbox
                  color="success"
                  onClick={handleFlavorClick(f)}
                  checked={flavor[f]}
                />
              }
              label={f}
              key={index}
            />
          ))}
      </FormGroup>
    </Box>
  );
}
