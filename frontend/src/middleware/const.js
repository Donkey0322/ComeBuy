import instance from "./axios";
import demoData from "../assets/data.json";
import { mode } from "../constants";

export const getConst = async () => {
  try {
    if (mode === "demo") return demoData;
    const { data: result } = await instance.get("/data");
    return result;
  } catch (error) {
    throw error;
  }
};
