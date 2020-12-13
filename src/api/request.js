import axios from "axios";
import { message } from "antd";
const ipUrl = "http://127.0.0.1:7001";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = ipUrl;
    config.withCredentials = true; // 允许cookie跨越，https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials
    config.timeout = 7000;
    const openId = localStorage.getItem("openId");
    config.headers = {
      "access-token": openId,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    const { data } = res;
    const { code, msg } = data;
    if (code === 0) {
      return data;
    }

    if (code === -1) {
      message.error(msg);
      throw new Error(data);
    }

    if (code === -4) {
      message.error("请登录");
      localStorage.removeItem("openId");
      throw new Error(data);
    }
    return Promise.reject(new Error("未知错误"));
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
