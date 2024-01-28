import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Footer({
  setOpenFaq,
  setOpenServiceM,
  setOpenPersonM,
}) {
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <FooterCt>
        <FooterNav>
          <FooterNavItem>
            <button
              onClick={() => {
                navigate("/intro");
              }}
            >
              회사소개
            </button>
          </FooterNavItem>
          <FooterNavItem>
            <button
              onClick={() => {
                setOpenServiceM((prev) => !prev);
              }}
            >
              서비스이용약관
            </button>
          </FooterNavItem>
          <FooterNavItem>
            <button
              onClick={() => {
                setOpenPersonM((prev) => !prev);
              }}
            >
              개인정보처리방침
            </button>
          </FooterNavItem>
          <FooterNavItem>
            <button
              onClick={() => {
                setOpenFaq((prev) => !prev);
              }}
            >
              자주 묻는 질문
            </button>
          </FooterNavItem>
        </FooterNav>
        {/* <div className="logoCt">
          <img src={Logo} alt="MESsie"></img>
        </div> */}

        <FooterInfo>
          <FooterInfoItem>
            <p>
              <span>대표이사</span> : 오원석
            </p>
          </FooterInfoItem>
          <FooterInfoItem>
            <p>
              <span>본 사</span> : 서울특별시 강서구 화곡로 416
            </p>
          </FooterInfoItem>
          <FooterInfoItem>
            <p>
              <span>문의전화</span> : 010-4282-5133
            </p>
          </FooterInfoItem>
          <FooterInfoItem>
            <p>
              <span>문의메일</span> : help@meswiser.ai
            </p>
          </FooterInfoItem>
          <FooterInfoItem>
            <p>
              <span>사업자등록번호</span> : 107-87-85562
            </p>
          </FooterInfoItem>
          <FooterInfoItem>
            <p>
              {" "}
              <span>통신판매업신고</span> : 제 2022-서울강서-2195호
            </p>
          </FooterInfoItem>
        </FooterInfo>
      </FooterCt>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  @media (min-width: 481px) {
  }
  background: #f4f7ff;
`;

const FooterCt = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;

  & .logoCt {
    margin-bottom: 15px;
  }

  @media (min-width: 481px) {
    max-width: 1024px;
    margin: 0 auto 15px;

    & .logoCt {
      margin: 7.5px 0;
      width: 160px;
    }
  }
`;

const FooterNav = styled.ul`
  width: 100%;
  max-width: 900px;
  padding: 5px;
  margin: 0 auto 15px;

  display: flex;
  flex: 1 0 100%;
`;

const FooterNavItem = styled.li`
  flex: 1 1 auto;
  padding: 0 2px;

  position: relative;
  text-align: center;

  & button {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    right: 0;
    background: #484848;
  }

  &:last-child:after {
    background: transparent;
  }

  & button {
    color: #484848;
    text-align: center;
    font-weight: 400;
    line-height: normal;
    font-size: 12px;
    letter-spacing: -0.5px;

    background: transparent;
    border: 0;
  }

  @media (min-width: 481px) {
    & button {
      font-size: 14px;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.14px;
    }
    &:after {
      content: none;
    }
  }
`;

const FooterInfo = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 481px) {
    max-width: 800px;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
const FooterInfoItem = styled.li`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 20px;
  }
  & p {
    color: #484848;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.5px;
  }

  @media (min-width: 481px) {
    display: flex;
    flex: 0 0 30%;
    & p {
      flex: 1 0 auto;
    }
    & p span {
      font-weight: 700;
    }
  }
`;
