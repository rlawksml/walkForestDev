import { Avatar, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

import roleImg01 from "../../../../assets/images/roleImg01.png";
import roleImg02 from "../../../../assets/images/roleImg02.png";
import roleImg03 from "../../../../assets/images/roleImg03.png";
import roleImg04 from "../../../../assets/images/roleImg04.png";
import roleImg05 from "../../../../assets/images/roleImgUser.png";

import emojiFire from "../../../../assets/images/emo_fire.png";

export default function RoleContent() {
  const roleList = [
    { img: roleImg01, name: "인문학 도서" },
    { img: roleImg02, name: "철학 도서" },
    { img: roleImg03, name: "문학 도서" },
    { img: roleImg04, name: "랜덤 추천 도서" },
  ];
  const UserRole = { img: roleImg05, name: "나의 기록" };

  const isLogined = false;

  return (
    <RoleSection>
      <Title variant="">
        <img src={emojiFire} alt="불이미지"></img> 오늘은 어떤 것으로{" "}
        {"         "}
        <Typography sx={{ margin: "0 0 0 7px" }} variant="" color={"primary"}>
          {"   "}
          시작
        </Typography>
        해 볼까요?
      </Title>
      <RoleList>
        {roleList?.map((role, index) => {
          return (
            <RoleListItem key={index}>
              <RoleImg variant="circular" src={role.img} />
              <RoelName variant="subtitle1">{role.name}</RoelName>
            </RoleListItem>
          );
        })}

        {isLogined && (
          <RoleListItem className="roleUser">
            <RoleImg variant="circular" src={UserRole.img} />
            <RoelName variant="subtitle1">{UserRole.name}</RoelName>
          </RoleListItem>
        )}
      </RoleList>
    </RoleSection>
  );
}

const RoleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  margin-bottom: 10px;
`;

const RoleList = styled.ul`
  display: flex;
  width: 100%;
  padding: 10px 0;

  overflow-x: auto;

  @media (min-width: 481px) {
  }
`;

const RoleListItem = styled.li`
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;

  align-items: center;
  justify-content: center;
  margin: 0;

  @media (min-width: 481px) {
    flex: 0 0 15%;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &.roleUser {
    margin-left: 10%;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 2px;
      height: 100%;
      left: 5px;
      top: 0;
      background: #dcdcdc;
    }

    @media (min-width: 481px) {
      &:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        left: -50%;
        top: 0;
        background: #dcdcdc;
      }
    }
  }
`;

const Title = styled(Typography)`
  display: flex;
  align-items: center;
  width: 100%;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  margin-bottom: 20px;

  & img {
    margin-right: 5px;
  }
`;

const RoleImg = styled(Avatar)`
  /* border: 1px solid #dcdcdc; */
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  /* overflow: none; */
  & img {
    width: 55px;
    height: 55px;
    object-fit: contain;
  }
`;

const RoelName = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
`;
