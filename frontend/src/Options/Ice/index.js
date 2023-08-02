import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCondition } from "../../hooks/useCondition";

const SORTBY = ["冰", "溫", "熱"];
const SECONDSORTBY = ["正常", "少", "半", "微", "去"];
const SORTFUNC = (a, b) =>
  SORTBY.findIndex((e) => a.includes(e)) -
    SORTBY.findIndex((e) => b.includes(e)) ||
  SECONDSORTBY.findIndex((e) => a.includes(e)) -
    SECONDSORTBY.findIndex((e) => b.includes(e)) ||
  a.localeCompare(b);

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
    condition,
    setCondition,
  } = useCondition();
  const [ice, setIce] = useState(
    DATA.reduce((acc, curr) => {
      acc[curr] = condition.ice.includes(curr);
      return acc;
    }, {})
  );

  const handleIceClick = (name) => (e) => {
    const { checked } = e.target;
    setIce((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (checked) {
      setCondition((prev) => ({ ...prev, ice: [...prev.ice, name] }));
    } else {
      setCondition((prev) => ({
        ...prev,
        ice: prev.ice.filter((s) => s !== name),
      }));
    }
  };

  useEffect(() => {
    setIce(
      DATA.reduce((acc, curr) => {
        acc[curr] = condition.ice.includes(curr);
        return acc;
      }, {})
    );
  }, [condition.ice]);

  return (
    <Box>
      <FormGroup row>
        {Object.keys(ice)
          .sort(SORTFUNC)
          .map((i, index) => (
            <FormControlLabel
              value={i}
              labelPlacement="bottom"
              control={
                <Checkbox
                  onClick={handleIceClick(i)}
                  // checkedIcon={
                  //   iceMap[i] && (
                  //     <svg height="30" width="26">
                  //       <polygon
                  //         points="2,2 24,2 18,28 8,28"
                  //         style={{
                  //           fill: "none",
                  //           stroke: "black",
                  //           strokeWidth: 2,
                  //         }}
                  //       />
                  //       <polygon
                  //         points={`${
                  //           (75 + Math.sqrt(178)) / 13 -
                  //           iceMap[i].value * (72 / 52) +
                  //           2
                  //         },${27 - iceMap[i].value * 6} ${
                  //           (211 - Math.sqrt(178)) / 13 +
                  //           iceMap[i].value * (72 / 52) +
                  //           2
                  //         },${27 - iceMap[i].value * 6} ${
                  //           (211 - Math.sqrt(178)) / 13 + 2
                  //         },27 ${(75 + Math.sqrt(178)) / 13 + 2},27`}
                  //         style={{
                  //           fill: iceMap[i]?.color ?? "#03a9f4",
                  //           stroke: "none",
                  //         }}
                  //       />
                  //     </svg>
                  //   )
                  // }
                  // icon={
                  //   <svg height="30" width="26">
                  //     <polygon
                  //       points="2,2 24,2 18,28 8,28"
                  //       style={{
                  //         fill: "black",
                  //         stroke: "black",
                  //         strokeWidth: 2,
                  //       }}
                  //     />
                  //   </svg>
                  // }
                  checked={ice[i]}
                />
              }
              label={i}
              key={index}
            />
          ))}
      </FormGroup>
    </Box>
  );
}
