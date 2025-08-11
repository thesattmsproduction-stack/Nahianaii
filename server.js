import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    const aiReply = data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    res.status(500).json({ error: "Error contacting AI API" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`NahianAI running on port ${PORT}`));
