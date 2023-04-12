import instance from "./axios";

export const getConst = async () => {
  try {
    console.log();
    const { data: result } = await instance.get("/data");
    console.log("GET /data", result);
    return result;
  } catch (error) {
    throw error;
  }
};
