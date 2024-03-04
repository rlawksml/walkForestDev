import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../../utils/book";
import { SearchContext } from "../../../../utils/providers/search/SearchContext";
import Empty from "../../Empty";
import { Button, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addFavorite } from "../../../../actions";
import { isBrowser } from "react-device-detect";
import { BookListSessionSet } from "../../../../utils/FavBookList";

export default function BookList({ setShowToast, setToastMessage }) {
  const itemData = [];

  const [bookList, setBookList] = useState();
  const { inputValue, setInputValue } = useContext(SearchContext);

  const [favoriteList, setFavoriteList] = useState([]);

  const favoriteListReducer = useSelector((state) => state.favorites.favorites);

  const dispatch = useDispatch();
  // redux 페이지 관리
  const handleAddFavorite = (item) => {
    dispatch(addFavorite(item));
  };

  // 데이터불러오기
  useEffect(() => {
    const promise = searchBook(inputValue);
    const getData = () => {
      promise.then((data) => {
        setBookList(data);
      });
    };
    getData();
  }, [inputValue]);

  const handleFavList = (item) => {
    const newItem = {
      title: item.title,
      author: item.authors[0],
      thum: item.thumbnail,
      url: item.url,
    };

    // favoriteList에 동일한 아이템이 존재하는지 확인
    const isExist = favoriteList.some((favItem) => favItem.url === newItem.url);

    // 중복되지 않는 경우에만 새로운 아이템 추가
    if (!isExist) {
      setFavoriteList((prevList) => [...prevList, newItem]);
      setToastMessage("📌 나의 도서 목록에 추가되었습니다");
      setShowToast((prev) => !prev);
      BookListSessionSet(favoriteListReducer);
    } else {
      setToastMessage("❌ 이미 추가된 아이템입니다");
      setShowToast((prev) => !prev);
    }
  };

  return (
    <Box>
      <CountBook>총 {bookList?.length} 개의 도서 검색</CountBook>
      {bookList && bookList.length > 0 ? (
        <ImageList variant="masonry" cols={isBrowser ? 4 : 2} gap={8}>
          {bookList.map((item, index) => (
            <MyImageListItem
              onClick={() => {
                handleFavList(item);
              }}
              key={index}
            >
              {item.thumbnail === "" ? (
                <Skeleton animation="wave" variant="rectangular" height={150} />
              ) : (
                <img
                  srcSet={`${item.thumbnail}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.thumbnail}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              )}

              <ImageListItemBar
                position="below"
                title={item.title}
              ></ImageListItemBar>
              <Button
                onClick={() => {
                  handleAddFavorite(item);
                }}
                className="cartBtn"
              >
                <AddShoppingCartIcon fontSize="large" color="primary" />
              </Button>
            </MyImageListItem>
          ))}
        </ImageList>
      ) : (
        <Empty desc={<>{inputValue} 관련 도서를 찾을 수 없습니다!</>} />
      )}
    </Box>
  );
}

const MyImageListItem = styled(ImageListItem)`
  .cartBtn {
    display: none;
    position: absolute;
  }
  &:hover {
    cursor: pointer;
    .cartBtn {
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const CountBook = styled(Typography)`
  display: block;
  text-align: right;
  font-size: 12px;
  margin: 5px 0;
`;
