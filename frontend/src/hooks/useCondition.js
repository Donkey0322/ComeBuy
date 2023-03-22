import { ContactlessOutlined } from "@mui/icons-material";
import { useState, useContext, createContext, useEffect } from "react";

const ConditionContext = createContext({
  condition: {},
  addLocationCondtion: () => {},
  deleteLocationCondition: () => {},
});

const ConditionProvider = (props) => {
  const [condition, setCondition] = useState({
    time: {},
    location: [],
    method: [],
    beverage: {},
  });

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

  return (
    <ConditionContext.Provider
      value={{
        condition,
        setCondition,
        addLocationCondtion,
        deleteLocationCondition,
      }}
      {...props}
    />
  );
};

const useCondition = () => useContext(ConditionContext);

export { ConditionProvider, useCondition };
