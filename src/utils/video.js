import axios from 'axios';


export const searchVideo = async (keyword)=>{
    let APIKEY = process.env.REACT_APP_KAKAO_API_KEY
    let videoList = []
    try {
      const response = await axios.get("https://dapi.kakao.com/v2/search/vclip", {
        params: {
          query: keyword,
        },
        headers: {
          Authorization: `KakaoAK ${APIKEY}`
        }
      });
      videoList = (response.data.documents);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }

    return videoList;
  }