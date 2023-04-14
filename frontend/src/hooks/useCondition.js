import { useState, useContext, createContext, useEffect } from "react";
import { getConst } from "../middleware";

const ConditionContext = createContext({
  condition: {},
  DATA: {},
  systemState: {},
  addLocationCondtion: () => {},
  deleteLocationCondition: () => {},
  addBeverageCondition: () => {},
  deleteBeverageCondition: () => {},
});

const ConditionProvider = (props) => {
  const [condition, setCondition] = useState({
    time: {},
    location: [
      {
        name: "新店光明店",
        level: "store",
        route: ["北區", "新北市", "新店區"],
      },
      {
        name: "花蓮中山店",
        level: "store",
        route: ["東區", "花蓮縣", "花蓮市"],
      },
    ],
    method: [],
    beverage: ["海神"],
  });
  const [systemState, setSystemState] = useState({});
  const [DATA, SETDATA] = useState("");

  const addLocationCondtion = (name, level, route) => {
    setCondition((prev) => ({
      ...prev,
      location: [...prev.location, { name, level, route }],
    }));
  };

  const deleteLocationCondition = (name, level) => {
    setCondition((prev) => ({
      ...prev,
      location: prev.location.filter(
        (l) => l.name !== name || l.level !== level
      ),
    }));
  };

  const addBeverageCondition = (name) => {
    setCondition((prev) => ({
      ...prev,
      beverage: [...prev.beverage, name],
    }));
  };

  const deleteBeverageCondition = (name) => {
    setCondition((prev) => ({
      ...prev,
      beverage: prev.beverage.filter((b) => b !== name),
    }));
  };

  useEffect(() => {
    if (!DATA) {
      (async () => {
        try {
          const result = await getConst();
          SETDATA(result);
        } catch (error) {
          throw error;
        }
      })();
    }
  }, [DATA]);

  return (
    <ConditionContext.Provider
      value={{
        condition,
        DATA,
        systemState,
        setSystemState,
        setCondition,
        addLocationCondtion,
        deleteLocationCondition,
        addBeverageCondition,
        deleteBeverageCondition,
      }}
      {...props}
    />
  );
};

const useCondition = () => useContext(ConditionContext);

export { ConditionProvider, useCondition };
