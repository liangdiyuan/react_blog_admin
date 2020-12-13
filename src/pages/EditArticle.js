import React, { useState, useEffect } from "react";
// import marked from "marked";
import { updateArticle, getArticleById } from "../api/index";
import ArticleForm from "../components/ArticleForm";
import { message } from "antd";
// import "../static/css/AddArticle.css";

const EditArticle = (props) => {
  const { id } = props.match.params;
  const [content, setContent] = useState({});

  useEffect(() => {
    getArticleById({ id }).then((data) => {
      setContent(data);
    });
  }, []);

  const saveArticle = (content) => {
    const { articleTitle, articleType, articleContent, introducemd } = content;
    updateArticle({
      id: id,
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
      <ArticleForm saveArticle={saveArticle} content={content} saxeBtnTxt="保存编辑"/>
    </div>
  );
};

export default EditArticle;
