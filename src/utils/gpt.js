import axios from "axios";
import OpenAI from "openai";

// OpenAI API 키 설정
const apiKey = process.env.REACT_APP_GPT_KEY;

const test = {
  organization: "org-n22DCDPf1au8qAXCqnO6Q5LC",
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
};
const openai = new OpenAI(test);

export const recommandGpt = async (keyword) => {
  let aws = "";
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "user",
        content: keyword,
      },
    ],
    temperature: 0,
    max_tokens: 3000,
    stream: true,
  });
  for await (const chunk of stream) {
    aws += chunk.choices[0]?.delta?.content || "";
  }

  return aws;
};

export const summaryGpt = async (keyword) => {
  try {
  } catch (error) {}
};
