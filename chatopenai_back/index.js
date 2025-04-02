import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const miVar = "ks"
const obj = {
  pt: "jorp",
  sec: "n31UbkuM6tq"
}

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { text, targetLang } = req.body;
  const promptSystem1 = "You are a helpful assistant that translates text into different languages.";
  const promptSystem2 = "only you can response with traducction direct of the text, no more no less.";
  const prompt = `Translate the following text to ${targetLang}: "${text}"`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: promptSystem1 },
        { role: "system", content: promptSystem2 },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      response_format: {type: "text"}
    });
    var otr = "GYWBmRP5WT3BlbkFJOY9"
    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

const myArr = [1, 2, 3, "ckqnSUWADLsHbQg2A", 5];
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});