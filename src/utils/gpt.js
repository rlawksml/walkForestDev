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

// https://velog.io/@bae-sh/GPT-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%ED%9B%84-%EB%B9%8C%EB%93%9C-Error-%ED%95%B4%EA%B2%B0-%EA%B3%BC%EC%A0%95%EA%B8%B0

export const recommandGpt = async (keyword) => {
  let aws = "";
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [{ role: "user", content: keyword }],
    temperature: 0,
    max_tokens: 3000,
    stream: true,
  });
  for await (const chunk of stream) {
    aws += chunk.choices[0]?.delta?.content || "";
  }

  console.log(aws);
  return aws;
};

// 사용방법
// recommandGpt(prompt).then((response) => {
//   console.log("ChatGPT의 응답:", response);
// });

export const summaryGpt = async (keyword) => {
  try {
  } catch (error) {}
};
