import React, { useState, useEffect } from "react";
import { getArticleList, deleteArticleById } from "../api/index";
import { Table, Space, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import "../static/css/ArticleList.css";

const ArticleList = (props) => {
  const [articleList, setArticleList] = useState([]);
  const { confirm } = Modal;

  const jumpEditArticle = (item) => {
    props.history.push({ pathname: "/index/edit/" + item.id });
  };

  const confirmDelete = (id) => {
    deleteArticleById({ id }).then((data) => {
      const { insertSuccess } = data;
      if (insertSuccess) {
        getArticleList().then((data) => {
          setArticleList(data);
        });
      }
    });
  };

  const showConfirm = (item) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确定删除该文章吗？",
      cancelText: "取消",
      okText: "确定",
      onOk() {
        Modal.destroyAll();
        confirmDelete(item.id);
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const tableHeader = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      width: 200,
    },
    {
      title: "类型",
      dataIndex: "typeName",
      key: "typeName",
      width: 100,
    },
    {
      title: "简介",
      dataIndex: "introduce",
      key: "introduce",
      className: "introduce-tet",
      width: 500,
    },
    {
      title: "浏览量",
      dataIndex: "viewCount",
      key: "viewCount",
      width: 100,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },

    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 170,
      render: (item) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              jumpEditArticle(item);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              showConfirm(item);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getArticleList().then((data) => {
      setArticleList(data);
    });
  }, []);

  return (
    <div>
      <Table
        rowKey="id"
        scroll={{ x: 1300, y: 400 }}
        bordered={true}
        dataSource={articleList}
        columns={tableHeader}
      />
    </div>
  );
};

export default ArticleList;
