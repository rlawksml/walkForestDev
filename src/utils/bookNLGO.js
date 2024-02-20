import axios from "axios";
import { useEffect } from "react";

export const recommandBook = async (keyword) => {
  let APIKEY = process.env.REACT_APP_NLGO_KEY;
  let bookList = [];
  let recommandRandom = 0;
  let drCodeList = [11, 6, 5, 4];

  recommandRandom = Math.floor(Math.random() * 4);
  console.log(drCodeList[recommandRandom]);

  try {
    const response = await axios.get(
      "https://www.nl.go.kr/NL/search/openApi/search.do",
      {
        params: {
          key: APIKEY,
          startRowNumApi: 1,
          endRowNemApi: 5,
          drCode: drCodeList[recommandRandom],
        },
        headers: {},
      }
    );
    bookList = response;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
  }

  console.log("bookList", bookList);
  return bookList;
};
