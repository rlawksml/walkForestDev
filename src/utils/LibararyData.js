import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import libraryData from "./librarySeoul/seoulCurrentLibrary.json";
import styled from "styled-components";

export default function LibararyData() {
  const [countPage, setCountPage] = useState();
  const [curPage, setCurPage] = useState(1);
  const [libraryList, setLibraryList] = useState();
  const [curlibraryItem, setcurLibraryItem] = useState();

  //   5개씩 끊어서 보여주기
  const perPage = 5;

  const handlePage = (e, newpage) => {
    setCurPage(newpage);
  };

  const handleData = () => {
    return curPage * perPage;
  };

  useEffect(() => {
    setcurLibraryItem(
      libraryData.DATA.slice(curPage * perPage - perPage, curPage * perPage)
    );
  }, [curPage]);

  useEffect(() => {
    setLibraryList(libraryData.DATA);
    setCountPage(Math.floor(libraryData.DATA.length / perPage));
    setcurLibraryItem(libraryData.DATA.slice(0, perPage));
  }, []);

  return (
    <LlbContent>
      {curlibraryItem?.map((item, index) => {
        return (
          <LibItemBox
            onClick={() => {
              window.open(item.hmpg_url);
            }}
            key={index}
          >
            <LibTitle>{item.lbrry_name}</LibTitle>
            <LibOpen color={"error"}>{item.fdrm_close_date}</LibOpen>
            <LibUrl color={"primary"}>{item.hmpg_url}</LibUrl>
          </LibItemBox>
        );
      })}
      <MyStack spacing={2}>
        <Pagination
          page={curPage}
          onChange={handlePage}
          count={countPage}
          color="success"
        />
      </MyStack>
    </LlbContent>
  );
}

const LlbContent = styled.div`
  margin: 10px 0;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const LibItemBox = styled.div`
  border: 1px solid blue;
  padding: 5px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin: 7.5px 0;

  &:hover {
    cursor: pointer;
    background: #f6c915;
  }
`;

const LibTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  position: relative;
  width: fit-content;
  max-width: 300px;
  z-index: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: #ffd66b7d;
    bottom: 0;
    left: 0;
  }
`;
const LibOpen = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
`;
const LibUrl = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MyStack = styled(Stack)`
  margin-top: auto;
`;
