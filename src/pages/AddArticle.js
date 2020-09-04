import React, { useState } from "react";
import marked from "marked";
import { Row, Col, Input, Select, Button } from "antd";
import "../static/css/AddArticle.css";

const AddArticle = () => {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

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

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue="Sing up" size="large">
                <Select.Option value="Sing up">视频教程</Select.Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <Input.TextArea
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
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;&nbsp;
              <Button type="primary" size="large">
                发布文章
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Input.TextArea
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

export default AddArticle;
