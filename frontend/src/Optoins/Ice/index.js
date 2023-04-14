import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";

import { useCondition } from "../../hooks/useCondition";

const iceMap = {
  去冰: { value: 0 },
  微冰: { value: 1 },
  半冰: { value: 2 },
  少冰: { value: 3 },
  正常冰: { value: 4 },
  熱品: { value: 4, color: "#d32f2f" },
  溫品: { value: 4, color: "#ff9800" },
};

export default function Ice() {
  const {
    DATA: { 冰塊: DATA },
  } = useCondition();

  return (
    <Box>
      <FormControl>
        <RadioGroup row>
          {DATA.map((i, index) => (
            <FormControlLabel
              value={i}
              labelPlacement="bottom"
              control={
                <Radio
                  checkedIcon={
                    <svg height="30" width="26">
                      <polygon
                        points="2,2 24,2 18,28 8,28"
                        style={{
                          fill: "none",
                          stroke: "black",
                          strokeWidth: 2,
                        }}
                      />
                      <polygon
                        points={`${
                          (75 + Math.sqrt(178)) / 13 -
                          iceMap[i].value * (72 / 52) +
                          2
                        },${27 - iceMap[i].value * 6} ${
                          (211 - Math.sqrt(178)) / 13 +
                          iceMap[i].value * (72 / 52) +
                          2
                        },${27 - iceMap[i].value * 6} ${
                          (211 - Math.sqrt(178)) / 13 + 2
                        },27 ${(75 + Math.sqrt(178)) / 13 + 2},27`}
                        style={{
                          fill: iceMap[i]?.color ?? "#03a9f4",
                          stroke: "none",
                        }}
                      />
                    </svg>
                  }
                  icon={
                    <svg height="30" width="26">
                      <polygon
                        points="2,2 24,2 18,28 8,28"
                        style={{
                          fill: "black",
                          stroke: "black",
                          strokeWidth: 2,
                        }}
                      />
                    </svg>
                  }
                />
              }
              label={i}
              key={index}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
