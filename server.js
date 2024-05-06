// server.js
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 3030;

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json()); // JSON 파싱 미들웨어

// 간단한 API 엔드포인트 생성
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// itemSearch
app.get("/api/bookFind", async (req, res) => {
  console.log("bookFind 호출")
  const { ttbkey, Query ,id } = req.query; // 요청에서 파라미터 추출
  try {
    const response = await axios.get(
      `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx`,
      {
        params: {
          ttbkey,
          Query : Query,
          Output: "XML",
          Sort:"SalesPoint",
          Start: 1,
          MaxResults: 3,
          SearchTarget : "Book",
          Cover : "Big",
          CategoryId: id,
        },
      }
    );
    res.send(response.data); // 알라딘 API로부터 받은 데이터를 클라이언트로 전송
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 외부 API 호출 예시 (알라딘 API)
app.get("/api/bookSearch", async (req, res) => {
  console.log("bookSearch 호출")
  const { ttbkey, itemIdType, itemId } = req.query; // 요청에서 파라미터 추출

  try {
    const response = await axios.get(
      `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx`,
      {
        params: {
          ttbkey,
          itemId,
        },
      }
    );
    res.send(response.data); // 알라딘 API로부터 받은 데이터를 클라이언트로 전송
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 상품 리스트 api (알라딘 API)
app.get("/api/bookList", async (req, res) => {
  console.log("bookList 호출")
  const { ttbkey, QueryType } = req.query; // 요청에서 파라미터 추출
  try {
    const response = await axios.get(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx`,
      {
        params:{
          ttbkey,
          QueryType,
          MaxResults: 5,
          start:1,
          SearchTarget:"Book",
          output:"JS",
          Cover:"Big",
          Version:20131101
        },
      }
    );
    res.send(response.data); // 알라딘 API로부터 받은 데이터를 클라이언트로 전송
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// cors 에러
const corsOptions = {
  origin: 'http://localhost:4000', // 허용할 출처 지정
  optionsSuccessStatus: 200 // 일부 레거시 브라우저(IE11, 다양한 SmartTV) 호환성 보장
};

app.use(cors(corsOptions));
