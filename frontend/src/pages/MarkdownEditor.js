import React, { useState } from "react";
import axios from "axios";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const handleInputChange = (e) => {
    const markdownText = e.target.value;
    setMarkdown(markdownText);

    axios
      .post("http://localhost:5000/convert", { markdown: markdownText })
      .then((response) => {
        setHtml(response.data.html);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="container">
      <h1 className="heading">Real-time Markdown Editor</h1>
      <textarea
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type your markdown here..."
        className="markdown-editor"
      />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="markdown-preview"
      />
    </div>
  );
};

export default MarkdownEditor;
