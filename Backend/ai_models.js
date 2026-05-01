import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// Gemini 2.5 Flash
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// DeepSeek R1
const deepSeekClient = new ModelClient(
  "https://models.github.ai/inference",
  new AzureKeyCredential(process.env.GITHUB_TOKEN_DEEPSEEK_R1)
);

// Grok 3
const grokClient = new ModelClient(
  "https://models.github.ai/inference",
  new AzureKeyCredential(process.env.GITHUB_TOKEN_GROK_3)
);

const gpt4oClient = new OpenAI({
    baseURL: "https://models.github.ai/inference",
    apiKey: process.env.GITHUB_TOKEN_GPT_4o,
});

export const ColdDownModel = (ms) => new Promise((r) => setTimeout(r, ms));

export const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);
};

export const models = [
    {
        name: "Gemini",
        handler: async (message) => {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash"
            });

            const result = await model.generateContent(message);
            return result.response.text();
        }
    },
    {
        name: "DeepSeek",
        handler: async (message) => {
            const response = await deepSeekClient.path("/chat/completions").post({
                body:{
                    messages: [{role: "user", content: message}],
                    model: "deepseek/DeepSeek-R1",
                    max_tokens: 2048,
                },
            });

            if(isUnexpected(response)){
                throw new Error(response.body.error);
            }

            console.log(response.headers);
            return response.body.choices[0].message.content;
        },
    },
    {
        name: "Grok",
        handler: async (message) => {
            const response = await grokClient.path('/chat/completions').post({
                body: {
                    messages: [
                        { role:"system", content: "" },
                        {role: "user", content: message}
                    ],
                    temperature: 1,
                    top_p: 1,
                    model: "xai/grok-3",
                }
            });

            if (isUnexpected(response)) {
                throw response.body.error;
            }

            console.log(response.headers);
            return response.body.choices[0].message.content;
        }
    },
    {
        name: "GPT-4o",
        handler: async (message) => {
            const response = await gpt4oClient.chat.completions.create({
                model: "openai/gpt-4o",
                messages: [
                    { role:"system", content: "" },
                    { role:"user", content: message }
                ],
                temperature: 1,
                max_tokens: 4096,
                top_p: 1
            });

            console.log(response.headers);
            return response.choices[0].message.content;
        }
    }
];