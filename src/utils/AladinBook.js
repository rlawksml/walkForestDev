
import axios from "axios";

let APIKEY = process.env.REACT_APP_ALADIN_API_KEY4;

 export const ListUpBooks = async () => {
  console.log("ListUpBooks 호출")
    try {
      const response = await axios.get('/api/bookList', {
        params: {
          ttbkey: APIKEY,
          QueryType : "ItemNewSpecial",
        }
      });
      console.log(response.data)
      // return response.data
      if(response.status === 200){
        return response.data
      }else{
        console.log("다른 에러 발생")
      }
    } catch (error) {
      console.error('Error searching books:', error);
      return null;
    }
  };

  export const selectBooks = async (Query,id) => {
    console.log("selectBooks 호출")
    console.log("Query,id",Query,id)
      try {
        const response = await axios.get('/api/bookFind', {
          params:{
                    ttbkey :APIKEY,
                    Query : Query,
                    id : id
            }
        });
        // console.log(response.data)
        if(response.status === 200){
          return response.data
        }else{
          console.log("다른 에러 발생")
        }
      } catch (error) {
        console.error('Error searching books:', error);
        return null;
      }
    };

