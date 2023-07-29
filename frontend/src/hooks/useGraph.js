import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useCondition } from "./useCondition";

const ValueMap = {
  杯數: "amount",
  杯數佔比: "amount_proportion",
  金額: "price",
  金額佔比: "price_proportion",
};

export default function useGraph(data, fetcher, analType = "period") {
  const [period, setPeriod] = useState(3);
  const [rawData, setRawData] = useState(data);
  const {
    condition: {
      time: { date },
    },
    systemState,
  } = useCondition();
  const [showType, setShowType] = useState("杯數佔比");
  const [graphType, setGraphType] = useState(
    systemState.part ? "折線圖" : "長條圖"
  );
  const [calType, setCalType] = useState("分開計算");
  const [constraint, setConstraint] = useState(data?.[0]?.constraint);
  const [key, setKey] = useState(0);

  const dataFormatProcessing = useCallback(
    (rawData, period, type, constraint) => {
      let location = new Set();
      const result =
        analType === "period"
          ? _.range(period)
              .map((p) => {
                const periods =
                  moment(date.start.toISOString())
                    .subtract(
                      (moment(date.end.toISOString()).diff(
                        moment(date.start.toISOString()),
                        "days"
                      ) +
                        1) *
                        p,
                      "days"
                    )
                    .format("YYYY-MM-DD") +
                  " " +
                  moment(date.end.toISOString())
                    .subtract(
                      (moment(date.end.toISOString()).diff(
                        moment(date.start.toISOString()),
                        "days"
                      ) +
                        1) *
                        p,
                      "day"
                    )
                    .format("YYYY-MM-DD");
                return rawData?.reduce(
                  (acc, curr) => {
                    if (
                      curr.start_date === periods.split(" ")[0] &&
                      (!constraint || constraint === curr.constraint)
                    ) {
                      const label =
                        calType === "分開計算"
                          ? `${curr.location} ${curr.drink}`
                          : `${curr.location}`;
                      acc[label] = (acc[label] ?? 0) + curr[ValueMap[type]];
                      location.add(label);
                    }
                    return acc;
                  },
                  { year: periods }
                );
              })
              .reverse()
          : _.range(date.end.$y - period, date.end.$y + 2).map((y) =>
              rawData?.reduce(
                (acc, curr) => {
                  if (
                    curr.year === y &&
                    (!constraint || constraint === curr.constraint)
                  ) {
                    acc[`${curr.location} ${curr.drink}`] =
                      curr[ValueMap[type]];
                    location.add(`${curr.location} ${curr.drink}`);
                  }
                  return acc;
                },
                { year: y }
              )
            );
      return {
        data:
          graphType === "長條圖" || analType !== "period"
            ? result
            : [{ year: "" }, ...result, { year: "" }],
        point: [...location].map((l) => ({ name: l, hide: false })),
      };
    },
    [date.end, date.start, graphType, calType, analType]
  );

  const [points, setPoints] = useState(
    dataFormatProcessing(rawData, period, showType, constraint)
  );

  useEffect(() => {
    setPoints(dataFormatProcessing(rawData, period, showType, constraint));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData, showType, constraint, dataFormatProcessing]);

  const debounceFetch = _.debounce(async (period) => {
    const result = await fetcher(
      analType === "period" ? { period } : { year: period }
    );
    setRawData(result);
  }, 300);

  const handlePeriodChange = (e) => {
    const { value } = e.target;
    if (value >= 1) {
      setPeriod(Number(value));
      debounceFetch(value);
    }
  };

  const handleLegendClick = (e) => {
    setPoints((prev) => ({
      ...prev,
      point: prev.point.map((b) =>
        b.name === e.dataKey ? { name: b.name, hide: !b.hide } : b
      ),
    }));
  };

  useEffect(() => {
    setKey((prev) => (prev % 10) + 1);
  }, [showType, constraint, rawData, graphType, calType]);

  return {
    period,
    showType,
    setShowType,
    graphType,
    setGraphType,
    calType,
    setCalType,
    constraint,
    setConstraint,
    points,
    key,
    handlePeriodChange,
    handleLegendClick,
  };
}
