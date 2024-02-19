import axios from "axios";

// OpenAI API 키 설정
const apiKey = process.env.REACT_APP_GPT_KEY;

export const recommandGpt = async (keyword) => {
  let bookList = [];
  try {
    const response = await axios.get(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003", // 또는 최신 모델을 사용하세요.
        prompt: keyword,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    bookList = response.data.choices[0].text.trim();
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
    return null;
  }

  return bookList;
};

// 사용방법
// recommandGpt(prompt).then((response) => {
//   console.log("ChatGPT의 응답:", response);
// });

export const summaryGpt = async (keyword) => {
  try {
  } catch (error) {}
};
