import React, { useEffect, useState } from "react";
import {
  Box,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Chip,
  Button,
  Collapse,
} from "@mui/material";
import DistrictModal from "./DistrictModal";
import { useCondition } from "../../../hooks/useCondition";
import Data from "../location.json";

export default function Location({ locationData, districtData }) {
  const { regions, setRegions, county, setCounty, handleChosenDelete } =
    locationData;
  const [countyFocus, setCountyFocus] = useState("");
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  const { condition, addLocationCondtion, deleteLocationCondition } =
    useCondition();

  const handleRegionFocus = (name) => () => {
    setRegions((prev) => ({
      ...prev,
      [name]: { ...prev[name], focused: !prev[name].focused },
    }));
  };

  const handleRegionCheck = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      addLocationCondtion(name, "region");
    } else {
      deleteLocationCondition(name, "region");
    }
    setRegions((prev) => ({
      ...prev,
      [name]: { ...prev[name], checked },
    }));
  };

  const handleCountyClick = (county) => () => {
    for (const region in Data["全台"]) {
      if (Boolean(Object.keys(Data["全台"][region]).indexOf(county) + 1)) {
        setModalData(Data["全台"][region][county]);
        break;
      }
    }
    setCountyFocus(county);
    setOpen(true);
  };

  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const handleCountyCheck = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      addLocationCondtion(name, "county");
    } else {
      deleteLocationCondition(name, "county");
    }
    setCounty((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    let res = [];
    for (const region in regions) {
      if (regions[region].focused) {
        res = [...res, ...Object.keys(Data["全台"][region])];
      }
    }
    setCounty(
      res.reduce(
        (acc, curr) => (
          (acc[curr] = Boolean(
            condition.location.find((e) => e.name === curr)
          )),
          acc
        ),
        {}
      )
    );
  }, [regions]);

  return (
    <Box>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">區域</FormLabel>
        <FormGroup row sx={{ ml: 1, mt: 1 }} gap={5}>
          {Object.keys(regions).map((r, index) => (
            <FormControlLabel
              control={
                <>
                  <Checkbox
                    checked={regions[r].checked}
                    onChange={handleRegionCheck}
                    // indeterminate={true}
                    name={r}
                  />
                  <Button
                    // sx={{ color: "black" }}
                    onClick={handleRegionFocus(r)}
                    variant={regions[r].focused ? "contained" : "outlined"}
                  >
                    {r}
                  </Button>
                </>
              }
              key={index}
              // label={"北區"}
            />
          ))}
        </FormGroup>
      </FormControl>{" "}
      <Collapse in={Object.keys(county).length > 0} unmountOnExit>
        <FormControl
          sx={{ ml: 3, mt: 3, maxWidth: "60%" }}
          component="fieldset"
          variant="standard"
        >
          <FormLabel component="legend">縣市</FormLabel>
          <FormGroup row>
            {Object.keys(county).map((c, index) => (
              <FormControlLabel
                control={
                  <>
                    <Checkbox
                      checked={county[c]}
                      onChange={handleCountyCheck}
                      name={c}
                    />
                    <Button onClick={handleCountyClick(c)} variant={"outlined"}>
                      {c}
                    </Button>
                  </>
                }
                key={index}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Collapse>
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
          width: "50%",
          borderRadius: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "2vmin",
          p: 1,
        }}
      >
        {condition.location.map((c, index) => (
          <Chip
            label={c.name}
            onDelete={handleChosenDelete(c.name, c.level, c.index)}
            key={index}
            name={c.name}
          />
        ))}
      </Box>
      {/* <CountyModal /> */}
      <DistrictModal
        countyFocus={countyFocus}
        open={open}
        setOpen={setOpen}
        modalData={modalData}
        districtData={districtData}
      />
    </Box>
  );
}
