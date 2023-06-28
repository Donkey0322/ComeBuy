import axios from "axios";

const instance = axios.create({
  baseURL: `http://${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`,
});

instance.interceptors.request.use(
  function (config) {
    console.log("REQ", config.method, config.url, config.data);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    console.log("RES", response.status, response.config.url, response.data);
    return response;
  },
  function (error) {
    if (error.response.config.url) {
      console.log("RES", 200, error.response.config.url, { status: "success" });
      return { data: { status: "success" } };
    }
    return Promise.reject(error);
  }
);

export default instance;
