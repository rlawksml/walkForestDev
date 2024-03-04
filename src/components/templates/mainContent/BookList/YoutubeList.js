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
import { isBrowser } from "react-device-detect";
import { Typography } from "@mui/material";

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
  }, [inputValue]);

  return (
    <Box>
      <CountYoutube>총 {youtubeList?.length} 개의 동영상 검색</CountYoutube>
      {youtubeList && youtubeList.length > 0 ? (
        <ImageList variant="masonry" cols={isBrowser ? 3 : 2} gap={8}>
          {youtubeList.map((item, index) => (
            <MyImageListItem
              key={index}
              onClick={() => {
                window.open(item.url);
              }}
            >
              <img
                srcSet={`${item.thumbnail}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.thumbnail}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
              <YoutubeTitle position="below" title={item.title} />
              <YoutubeAuthor position="below" title={item.author} />
            </MyImageListItem>
          ))}
        </ImageList>
      ) : (
        <Empty desc={<>{inputValue} 관련 영상을 찾을 수 없습니다!</>} />
      )}
    </Box>
  );
}

const MyImageListItem = styled(ImageListItem)`
  border: 1px solid #dcdcdc;
  border-radius: 5px;

  cursor: pointer;
`;

const YoutubeTitle = styled(ImageListItemBar)`
  padding: 0 5px;
  & .MuiImageListItemBar-titleWrap {
    padding: 3px 0;
  }
  & .MuiImageListItemBar-title {
    font-size: 13px;
    letter-spacing: -0.5px;
  }
`;

const YoutubeAuthor = styled(ImageListItemBar)`
  padding: 0 7px;
  & .MuiImageListItemBar-titleWrap {
    padding: 3px 0;
  }
  & .MuiImageListItemBar-title {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.5px;
  }
`;
const CountYoutube = styled(Typography)`
  display: block;
  text-align: right;
  font-size: 12px;
  margin: 5px 0;
`;
