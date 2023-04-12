import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";

import { useCondition } from "../../hooks/useCondition";

export default function Ice() {
  const {
    DATA: { 冰塊: DATA },
  } = useCondition();
  return (
    <Box sx={{ ml: 2 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {DATA.map((i, index) => (
            <FormControlLabel
              value={i}
              control={<Radio />}
              label={i}
              key={index}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
