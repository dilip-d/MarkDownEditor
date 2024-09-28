import express from "express";
import cors from "cors";
import { marked } from "marked";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.post("/convert", (req, res) => {
  const markdownText = req.body.markdown;
  const html = marked(markdownText);
  res.send({ html });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
