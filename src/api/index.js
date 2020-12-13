import request from "./request";
import { message } from "antd";

export const login = async (param) => {
  try {
    const res = await request.post("/admin/login", param);
    const { code, data } = res;
    if (code === 0) {
      localStorage.setItem("openId", data);
    }
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getArticleTypeList = async (param) => {
  try {
    const res = await request.get("/admin/getArticleTypeList", param);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = async (param) => {
  try {
    const res = await request.post("/admin/createArticle", param);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getArticleList = async (param) => {
  try {
    const res = await request.get("/admin/getArticleList", param);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticleById = async (param) => {
  try {
    const res = await request.post("/admin/deleteArticleById", param);
    message.success(res.msg);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getArticleById = async (param) => {
  try {
    const res = await request.get("/admin/getArticleById", { params: param });
    message.success(res.msg);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (param) => {
  try {
    const res = await request.post("/admin/updateArticle", param);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
