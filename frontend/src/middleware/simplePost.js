import instance from "./axios";
import demoSearch from "../assets/search.json";
import demoLineChart from "../assets/line.json";
import demoBarChart from "../assets/bar.json";
import { mode } from "../constants";

const URL = {
  searchItem: "/search_item",
  getLineChart: "/line_item",
  getBarChart: "/bar_item",
  newItem: "/new",
  updateItem: "/update",
};

export default Object.keys(URL).reduce((acc, curr) => {
  acc[curr] = async (data, token = undefined) => {
    try {
      if (mode === "demo") {
        switch (curr) {
          case "searchItem":
            return demoSearch;
          case "getLineChart":
            return demoLineChart;
          case "getBarChart":
            return demoBarChart;
          default:
            window.alert(
              "This is a demo environment. Some features are suspended."
            );
            return;
        }
      }
      const { data: result } = await instance.post(
        URL[curr],
        data,
        token && { headers: { "auth-token": token } }
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return acc;
}, {});
