import instance from "./axios";
const URL = {
  searchItem: "/search_item",
  getLineChart: "/line_item",
  getBarChart: "/bar_item",
};

export default Object.keys(URL).reduce((acc, curr) => {
  acc[curr] = async (data, token = undefined) => {
    try {
      console.log(`POST ${URL[curr]} req:`, data);
      console.log();
      const { data: result } = await instance.post(
        URL[curr],
        data,
        token && { headers: { "auth-token": token } }
      );
      console.log(`POST ${URL[curr]} res:`, result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return acc;
}, {});

// await instance.post("/login", { data: { user_identifier: "", password: "" } });
