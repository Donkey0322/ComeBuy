import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Graph({
  graphType,
  points,
  THEME,
  handleLegendClick,
  graphKey,
  cartesianGridProps,
  xAxisProps,
  yAxisProps,
  tooltipProps,
  legendProps,
}) {
  const GRAPH = (children) => {
    const settings = {
      width: 500,
      height: 300,
      data: points.data,
      margin: {
        top: 20,
        right: 20,
        left: 20,
        bottom: 20,
      },
      key: graphKey,
    };
    return {
      長條圖: (
        <BarChart {...settings}>
          {children}
          {points.point.map((l, index) => (
            <Bar
              key={index}
              dataKey={l.name}
              fill={THEME[index]}
              hide={l.hide}
              stackId={l.name.split(" ")[0]}
            />
          ))}
        </BarChart>
      ),
      折線圖: (
        <LineChart {...settings}>
          {children}
          {points.point.map((l, index) => (
            <Line
              type="linear"
              dataKey={l.name}
              stroke={THEME[index]}
              activeDot={{ r: 8 }}
              strokeWidth={3}
              key={index}
              hide={l.hide}
            />
          ))}
        </LineChart>
      ),
    };
  };

  return (
    <ResponsiveContainer width="80%" height={400} minWidth={600}>
      {
        GRAPH(
          <>
            <CartesianGrid {...cartesianGridProps} />
            <XAxis dataKey="year" {...xAxisProps} />
            <YAxis includeHidden {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Legend
              iconSize={25}
              iconType="rect"
              wrapperStyle={{ fontWeight: "600", cursor: "pointer" }}
              verticalAlign="top"
              onClick={handleLegendClick}
              height={60}
              {...legendProps}
            />
          </>
        )[graphType]
      }
    </ResponsiveContainer>
  );
}
