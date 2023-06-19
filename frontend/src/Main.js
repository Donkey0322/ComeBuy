import React from "react";
import SieveType from "./Optoins/SieveType";
import Visualization from "./Visualization";
import { useCondition } from "./hooks/useCondition";

const Main = () => {
  const { DATA } = useCondition();

  return (
    <>
      {DATA && (
        <>
          <SieveType />
          <Visualization />
        </>
      )}
    </>
  );
};

export default Main;
