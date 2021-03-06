import React from "react";
// import marked from "marked";
import { createArticle } from "../api/index";
import ArticleForm from "../components/ArticleForm";
import { message } from "antd";
// import "../static/css/AddArticle.css";

const AddArticle = (props) => {
  const saveArticle = (content) => {
    const { articleTitle, articleType, articleContent, introducemd } = content;
    createArticle({
      title: articleTitle,
      typeId: articleType,
      articleContent: articleContent,
      introduce: introducemd,
    }).then((data) => {
      const { insertSuccess } = data;
      if (insertSuccess) message.success("发布成功");
    });
  };
  return (
    <div>
      <ArticleForm saveArticle={saveArticle} />
    </div>
  );
};

export default AddArticle;
