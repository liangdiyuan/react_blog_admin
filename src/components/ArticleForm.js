import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import marked from "marked";
import { getArticleTypeList } from "../api/index";
import { Row, Col, Input, Select, Button, message } from "antd";
import "../static/css/AddArticle.css";

const ArticleForm = (props) => {
  // const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [articleTypeList, setArticleTypeList] = useState([]); // 文章类别信息
  const [articleType, setArticleType] = useState(1); //选择的文章类别

  useEffect(() => {
    getArticleTypeList().then((data) => {
      if (!data) props.history.push("/login");
      setArticleTypeList(data);
    });
  }, []);

  useEffect(() => {
    // 初始化数据
    if (props.content) {
      const {
        title = "",
        articleContent = "",
        introduce = "",
        typeId = "",
      } = props.content;
      setArticleTitle(title);
      setArticleContent(articleContent);
      setIntroducemd(introduce);
      setArticleType(typeId);
      setMarkdownContent(marked(articleContent));
      setIntroducehtml(marked(introduce));
    }
  }, [props.content]);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    const value = e.target.value;
    setArticleContent(value);
    const html = marked(value);
    setMarkdownContent(html);
  };

  const changeIntroducemd = (e) => {
    const value = e.target.value;
    setIntroducemd(value);
    const html = marked(value);
    setIntroducehtml(html);
  };

  const saveArticle = () => {
    if (!articleTitle) {
      message.error("文章标题不能为空");
      return false;
    }
    if (!articleType) {
      message.error("文章类型不能为空");
      return false;
    }
    if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    }
    if (!introducemd) {
      message.error("文章简介不能为空");
      return false;
    }

    props.saveArticle({
      articleTitle,
      articleType,
      articleContent,
      introducemd,
    });
  };
  return (
    <div>
      <Row gutter={10}>
        <Col span={18}>
          <Row gutter={12}>
            <Col span={18}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              <Select
                size="large"
                defaultValue={articleType}
                placeholder="请选择"
                onChange={(value) => {
                  setArticleType(value);
                }}
              >
                {articleTypeList.map((item) => {
                  return (
                    <Select.Option value={item.id} key={item.id}>
                      {item.typeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={12}>
            <Col span={12}>
              <Input.TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24} className="btn-box">
              {/* <Button size="large">暂存文章</Button> */}
              <Button type="primary" size="large" onClick={saveArticle}>
                {props.saxeBtnTxt || "发布文章"}
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Input.TextArea
                value={introducemd}
                onChange={changeIntroducemd}
                placeholder="文章简介"
                rows={4}
              />
              <br /> <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(ArticleForm);
