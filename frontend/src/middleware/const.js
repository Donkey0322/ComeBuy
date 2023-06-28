import instance from "./axios";

export const getConst = async () => {
  try {
    const { data: result } = await instance.get("/data");
    return result;
  } catch (error) {
    throw error;
  }
};
