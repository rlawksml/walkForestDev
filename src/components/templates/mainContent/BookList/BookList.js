import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../../utils/book";
import { SearchContext } from "../../../../utils/providers/search/SearchContext";
import Empty from "../../Empty";
import { Button, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addFavorite } from "../../../../actions";

export default function BookList({}) {
  const itemData = [];

  const [bookList, setBookList] = useState();
  const { inputValue, setInputValue } = useContext(SearchContext);

  const [favoriteList, setFavoriteList] = useState([]);

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
  }, []);

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
    } else {
      console.log("이미 추가된 아이템입니다.");
    }
  };

  useEffect(() => {
    console.log(favoriteList);
  }, [favoriteList]);

  return (
    <Box>
      {bookList && bookList.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
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
