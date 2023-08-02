import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCondition } from "../../hooks/useCondition";

const SORTBY = ["蜜", "糖"];
const SECONDSORTBY = ["無", "1", "微", "半", "少", "正", "多"];
const SORTFUNC = (a, b) =>
  SORTBY.findIndex((e) => a.includes(e)) -
    SORTBY.findIndex((e) => b.includes(e)) ||
  SECONDSORTBY.findIndex((e) => a.includes(e)) -
    SECONDSORTBY.findIndex((e) => b.includes(e)) ||
  a.localeCompare(b);

// const SWEETMAP = {
//   微蜜: 1,
//   半蜜: 2,
//   少蜜: 3,
//   多蜜: 4,
//   無糖: 0,
//   "1分糖": 1,
//   微糖: 2,
//   半糖: 3,
//   少糖: 4,
//   正常糖: 5,
// };

export default function Sweet() {
  const {
    DATA: { 甜度: DATA },
    condition,
    setCondition,
  } = useCondition();
  const [sweet, setSweet] = useState(
    DATA.reduce((acc, curr) => {
      acc[curr] = condition.sweet.includes(curr);
      return acc;
    }, {})
  );

  const handleSweetClick = (name) => (e) => {
    const { checked } = e.target;
    setSweet((prev) => ({
      ...prev,
      [name]: checked,
    }));
    if (checked) {
      setCondition((prev) => ({ ...prev, sweet: [...prev.sweet, name] }));
    } else {
      setCondition((prev) => ({
        ...prev,
        sweet: prev.sweet.filter((s) => s !== name),
      }));
    }
  };

  useEffect(() => {
    setSweet(
      DATA.reduce((acc, curr) => {
        acc[curr] = condition.sweet.includes(curr);
        return acc;
      }, {})
    );
  }, [condition.sweet, DATA]);

  return (
    <Box>
      <FormGroup row>
        {Object.keys(sweet)
          .map((m) => (m.includes("分") ? m.replace("分", "分糖") : m))
          .sort(SORTFUNC)
          .map((s, index) => (
            <FormControlLabel
              value={s} //分糖
              labelPlacement="bottom"
              control={
                <Checkbox
                  onClick={handleSweetClick(
                    s.includes("分糖") ? s.replace("分糖", "分") : s
                  )}
                  color="warning"
                  // checkedIcon={
                  //   <img
                  //     src={require(`./asset/${
                  //       s.includes("蜜") ? "honey3_checked" : "sugar 4"
                  //     }.png`)}
                  //     width="35px"
                  //   />
                  // }
                  // icon={
                  //   <img
                  //     src={require(`./asset/${
                  //       s.includes("蜜")
                  //         ? "honey3_nochecked"
                  //         : "sugar 4 nocheck"
                  //     }.png`)}
                  //     width="35px"
                  //   />
                  // }
                  checked={
                    sweet[s.includes("分糖") ? s.replace("分糖", "分") : s]
                  }
                />
              }
              label={s}
              key={index}
            />
          ))}
      </FormGroup>
    </Box>
  );
}
