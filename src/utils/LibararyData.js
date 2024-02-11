import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import libraryData from "./librarySeoul/seoulCurrentLibrary.json";

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
    <div>
      {curlibraryItem?.map((item, index) => {
        return (
          <div key={index}>
            <Typography>{item.lbrry_name}</Typography>
            <Typography>{item.fdrm_close_date}</Typography>
            <Typography>{item.hmpg_url}</Typography>
          </div>
        );
      })}
      <Stack spacing={2}>
        <Pagination
          page={curPage}
          onChange={handlePage}
          count={countPage}
          color="success"
        />
      </Stack>
    </div>
  );
}
