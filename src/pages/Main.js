import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  EditOutlined,
  MenuOutlined,
  // PieChartOutlined,
  // FileOutlined,
} from "@ant-design/icons";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import EditArticle from "./EditArticle";
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
        <Menu
          theme="dark"
          defaultSelectedKeys={[window.location.pathname]}
          defaultOpenKeys={["sub2"]}
          mode="inline"
        >
          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item> */}
          <SubMenu key="sub2" icon={<DesktopOutlined />} title="文章管理">
            <Menu.Item key="/index/add" icon={<EditOutlined />}>
              <Link to={{ pathname: "/index/add" }}>添加文章</Link>
            </Menu.Item>
            <Menu.Item key="/index" icon={<MenuOutlined />}>
              <Link to={{ pathname: "/index" }}>文章列表</Link>
            </Menu.Item>
          </SubMenu>
          {/* <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Route path="/index/add" exact component={AddArticle} />
            <Route path="/index/edit/:id" exact component={EditArticle} />
            <Route path="/index" exact component={ArticleList} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>ldy.com</Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
