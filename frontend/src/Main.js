import React, { useEffect } from "react";
import SieveType from "./Optoins/SieveType";
import Visualization from "./Visualization";
import { useCondition } from "./hooks/useCondition";
import { getConst } from "./middleware";

const Main = () => {
  const { DATA, SETDATA } = useCondition();

  useEffect(() => {
    (async () => {
      try {
        const result = await getConst();
        console.log("Hi");
        SETDATA(result);
      } catch (error) {
        throw error;
      }
    })();
  }, [SETDATA]);

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
