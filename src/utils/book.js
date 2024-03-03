import axios from "axios";

export const searchBook = async (keyword) => {
  let APIKEY = process.env.REACT_APP_KAKAO_API_KEY;
  let bookList = [];
  try {
    const response = await axios.get(
      "https://dapi.kakao.com/v3/search/book?target=title?target=authors",
      {
        params: {
          query: keyword,
          page: 40,
          size: 25,
          target: "title",
        },
        headers: {
          Authorization: `KakaoAK ${APIKEY}`,
        },
      }
    );
    bookList = response.data.documents;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
  }

  return bookList;
};
