import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // You can use any theme from highlight.js

// Set up marked to use highlight.js for code syntax highlighting
marked.setOptions({
  highlight: function (code, language) {
    // If a language is specified, use it, otherwise auto-detect
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
});

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);

    axios
      .post("http://localhost:5000/convert", { markdown: e.target.value })
      .then((response) => {
        // Apply syntax highlighting to the returned HTML
        const highlightedHtml = marked(response.data.html);
        setHtml(highlightedHtml);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="container">
      <textarea
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type your markdown here..."
      />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ backgroundColor: "#f6f8fa", padding: "10px" }}
      />
    </div>
  );
};

export default MarkdownEditor;
