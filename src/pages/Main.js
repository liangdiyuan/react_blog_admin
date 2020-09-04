import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from "@ant-design/icons";
import AddArticle from "./AddArticle";
import "../static/css/Main.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"></div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <SubMenu key="sub2" icon={<DesktopOutlined />} title="文章管理">
            <Menu.Item key="6">添加文章</Menu.Item>
            <Menu.Item key="8">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Route path="/" component={AddArticle} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>ldy.com</Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
