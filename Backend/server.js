import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors(
  {
    origin: ['https://quark-ai-sage.vercel.app', 'http://localhost:5174'], 
  },
));
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔥 ذاكرة المحادثات
const conversations = {};

const system = `
أنت مساعد ذكي، أسلوبك:

- تشرح بطريقة بسيطة وواضحة
- تستخدم ايموجي بشكل ذكي 😄🔥
- تتكلم بشكل ودي (مش رسمي)
- ما تطول بدون داعي
- لما في كود → رتبه بشكل جميل

إذا المستخدم عربي:
- رد بالعربي
- استخدم ايموجي خفيف

إذا المستخدم إنجليزي:
- رد بالإنجليزي

كن طبيعي جداً، مثل ChatGPT
`;

export const generateImage = async (prompt) => {
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: prompt,
    size: "1024x1024", // أو 512x512
  });

  return response.data[0].url;
};

app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;
  console.log("📸 Image generation request:", prompt);
  try {
    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "1024x1024",
    });

    res.json({
      image: result.data[0].url
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message, userId = "default-user" } = req.body;

  let model = "gpt-4o-mini";

  if (message.length > 200) {
    model = "gpt-4.1";
  }

    console.log("\n==============================");
    console.log("📥 New Request");
    console.log("👤 User:", userId);
    console.log("💬 Message:", message);
    console.log("🤖 Model:", model);

  try {
    // 🧠 إنشاء ذاكرة إذا مش موجودة
    if (!conversations[userId]) {
      conversations[userId] = [];
    }

    // ➕ إضافة رسالة المستخدم
    conversations[userId].push({
      role: "user",
      content: message
    });

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const stream = await client.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: system },
        ...conversations[userId] // 🔥 كل الذاكرة
      ],
      stream: true,
    });

    let fullReply = "";

    // 🔥 streaming + تجميع الرد
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content || "";

      fullReply += content;
      res.write(content);
    }

    // ➕ حفظ رد AI
    conversations[userId].push({
      role: "assistant",
      content: fullReply
    });

    // 💣 limit (آخر 20 رسالة فقط)
    conversations[userId] = conversations[userId].slice(-20);

    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).end("Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});