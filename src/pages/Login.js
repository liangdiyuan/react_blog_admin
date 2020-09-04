import React, { useState } from "react";
import { Button, Card, Input, Spin, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import axios from "axios";
import sericePath from "../config/apiUrl";
import "../static/css/Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    console.log(userName, password);

    if (userName === "") {
      message.error("请输入用户名");
      return false;
    }
    if (password === "") {
      message.error("请输入密码");
      return false;
    }
    setIsLoading(true);
    axios({
      method: "post",
      url: sericePath.login,
      data: {
        userName,
        password,
      },
      withCredentials: true, // 允许cookie跨越，https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials
    })
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="LDY Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
