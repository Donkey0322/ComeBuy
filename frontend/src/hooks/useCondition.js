import { useState, useContext, createContext, useEffect } from "react";
import { getConst } from "../middleware";

/*測試用*/
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
/****************************/

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
    time: {
      time: {
        start: dayjs(dayjs().format().slice(0, 11) + "T00:00"),
        end: dayjs(dayjs().format().slice(0, 11) + "T23:59"),
      },
      date: {
        start: dayjs("2023-03-23"),
        end: dayjs("2023-03-30"),
      },
    },
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
    beverage: [
      { name: "海神", category: "原葉鮮萃茶" },
      { name: "鮮萃大麥紅茶", category: "原葉鮮萃茶" },
    ],
    ice: ["正常冰"],
    sweet: ["正常糖"],
    flavor: [],
    topping: [],
    part: false,
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

  const addBeverageCondition = (name, category) => {
    setCondition((prev) => ({
      ...prev,
      beverage: prev.beverage.concat(
        Array.isArray(name)
          ? name.map((n) => ({ name: n, category }))
          : [{ name, category }]
      ),
    }));
  };

  const deleteBeverageCondition = (name) => {
    setCondition((prev) => ({
      ...prev,
      beverage: prev.beverage.filter((b) =>
        Array.isArray(name) ? !name.some((e) => b.name === e) : b.name !== name
      ),
    }));
  };

  useEffect(() => {
    if (!DATA) {
      (async () => {
        try {
          console.log("Hi");
          const result = await getConst();
          console.log(result);
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
