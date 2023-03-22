import React, { useState } from "react";
import Data from "../location.json";
import Location from "./Location";
import { useCondition } from "../../../hooks/useCondition";

const Index = () => {
  const regionKey = Object.keys(Data["全台"]);
  const [regions, setRegions] = useState(
    regionKey.reduce(
      (acc, curr) => (
        (acc[curr] = { checked: false, focused: false, class: "region" }), acc
      ),
      {}
    )
  );
  const [county, setCounty] = useState({});
  const [district, setDistrict] = useState({});
  const [store, setStore] = useState([]);
  const { deleteLocationCondition } = useCondition();

  const handleChosenDelete =
    (name, level, index = null) =>
    () => {
      console.log(name, level);
      deleteLocationCondition(name, level);
      switch (level) {
        case "region":
          setRegions((prev) => ({
            ...prev,
            [name]: { ...prev[name], checked: false },
          }));
          break;
        case "county":
          setCounty((prev) => ({
            ...prev,
            [name]: false,
          }));

        default:
          break;
      }
    };

  const locationData = {
    regions,
    setRegions,
    county,
    setCounty,
    handleChosenDelete,
  };

  const districtData = {
    district,
    setDistrict,
    store,
    setStore,
  };

  return <Location locationData={locationData} districtData={districtData} />;
};

export default Index;
