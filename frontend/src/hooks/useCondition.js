import { createContext, useContext, useEffect, useState } from "react";
/*測試用*/
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
      // time: {
      //   start: dayjs(dayjs().format().slice(0, 11) + "T00:00"),
      //   end: dayjs(dayjs().format().slice(0, 11) + "T23:59"),
      // },
      // date: {
      //   start: dayjs("2023-01-01"),
      //   end: dayjs("2023-01-03"),
      // },
    },
    location: [
      // {
      //   name: "新店光明店",
      //   level: "store",
      //   route: ["北區", "新北市", "新店區"],
      // },
      // {
      //   name: "花蓮中山店",
      //   level: "store",
      //   route: ["東區", "花蓮縣", "花蓮市"],
      // },
    ],
    method: [],
    beverage: [
      // { name: "海神", category: "原葉鮮萃茶" },
      // { name: "鮮萃大麥紅茶", category: "原葉鮮萃茶" },
    ],
    ice: [],
    sweet: [],
    flavor: [],
    topping: [],
    part: false,
  });
  const [systemState, setSystemState] = useState({});
  const [DATA, SETDATA] = useState("");

  const addLocationCondtion = (name, level, route) => {
    if (condition.location.some((e) => e.name === "全台")) {
      setCondition((prev) => ({
        ...prev,
        location: [{ name, level, route }],
      }));
      return;
    }
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
    if (!condition.location.length) {
      setCondition((prev) => ({
        ...prev,
        location: [
          {
            name: "全台",
            level: "region",
            route: [],
          },
        ],
      }));
    }
  }, [condition.location]);

  return (
    <ConditionContext.Provider
      value={{
        condition,
        DATA,
        systemState,
        setSystemState,
        setCondition,
        SETDATA,
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
