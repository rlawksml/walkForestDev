import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../../utils/book";
import { SearchContext } from "../../../../utils/providers/search/SearchContext";
import { searchVideo } from "../../../../utils/video";
import Empty from "../../Empty";

export default function YoutubeList({}) {
  const itemData = [];

  const [youtubeList, setYoutubeList] = useState();
  const { inputValue, setInputValue } = useContext(SearchContext);

  useEffect(() => {
    const promise = searchVideo("도서 리뷰  " + inputValue);
    const getData = () => {
      promise.then((data) => {
        setYoutubeList(data);
      });
    };
    getData();
  }, []);

  return (
    <Box>
      {youtubeList && youtubeList.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {youtubeList.map((item, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${item.thumbnail}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.thumbnail}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar position="below" title={item.title} />
              <ImageListItemBar position="below" title={item.author} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Empty desc={<>{inputValue} 관련 영상을 찾을 수 없습니다!</>} />
      )}
    </Box>
  );
}
