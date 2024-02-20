import axios from "axios";
import { useEffect } from "react";

export const recommandBook = async (keyword) => {
  let APIKEY = process.env.REACT_APP_NLGO_KEY;
  let bookList = [];
  let recommandRandom = 0;
  let drCodeList = [11, 6, 5, 4];

  recommandRandom = Math.floor(Math.random() * 4);

  try {
    const response = await axios.get(
      "https://nl.go.kr/NL/search/openApi/saseoApi.do",
      {
        params: {
          key: APIKEY,
          startRowNumApi: 1,
          endRowNemApi: 5,
          start_date: 20200101,
          end_date: 20240101,
          drCode: Number(drCodeList[recommandRandom]),
        },
        headers: { Authorization: "", ContentType: "" },
      }
    );
    bookList = response;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
  }

  console.log("bookList", bookList);
  return bookList;
};
