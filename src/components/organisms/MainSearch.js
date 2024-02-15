import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/joy";
import Input from "@mui/joy/Input";
import { SearchContext } from "../../utils/providers/search/SearchContext";
import { useLocation, useNavigate } from "react-router";

export default function MainSearch({ searchClass }) {
  const { inputValue, setInputValue } = useContext(SearchContext);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // enter 함수
  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      setInputValue(e.target.value);
      if (location.pathname !== "/SearchBook") {
        navigate("/SearchBook");
      }
    }

    return;
  };

  // input button 함수
  const handleInputBtn = () => {
    setInputValue(inputRef.current.value);
    if (location.pathname !== "/SearchBook") {
      navigate("/SearchBook");
    }
  };

  useEffect(() => {
    setInputValue("");
  }, []);

  return (
    <MyInput className={searchClass}>
      <Input
        ref={inputRef}
        sx={{ height: "52px" }}
        className="searchBar"
        variant="outlined"
        color="neutral"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputEnter}
        placeholder="도서 검색"
        startDecorator={
          <Button
            sx={{ height: "100%" }}
            variant="soft"
            color="neutral"
            startDecorator={<SearchIcon />}
            onClick={handleInputBtn}
          ></Button>
        }
      />
    </MyInput>
  );
}
const MyInput = styled.div`
  margin: 15px 0 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  .searchBar {
    width: 85%;
    padding-left: 10px;
  }
  &.subPage {
    margin: 5px 0;
  }
`;
