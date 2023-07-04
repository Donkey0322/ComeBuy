import instance from "./axios";
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
