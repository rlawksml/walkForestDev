import { Button, ButtonGroup, Chip, Option } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../utils/book.js";
// import { recommandGpt } from "../../../utils/gpt.js";
import { isBrowser } from "react-device-detect";
import Loading from "../Loading.js";
import robot from "../../../assets/images/robot.png";
import book0 from "../../../assets/images/banner0.jpg";
import book1 from "../../../assets/images/banner1.jpg";
import book2 from "../../../assets/images/banner2.jpg";
import BookGeneration from "../../../utils/BookGeneration.js";
import { ListUpBooks } from "../../../utils/AladinBook.js";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';

export default function BannerTop({
  setOpenDia,
  setDiaMessageTitle,
  setDiaMessageDesc,
}) {
  // const { BannerBookList } = BookGeneration;
  // 랜덤 변수 만들기
  let randomNum = Math.floor(Math.random() * 5);;

  const [todayBook, setTodayBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isApiConnected, setIsApiConnecgted] = useState(false)

  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleLength = () => {
    if(todayBook.description !== ""){
      if (isBrowser) {
        if (todayBook.description && todayBook.description.length >= 80) {
          return todayBook.description.substr(0, 80) + "...";
        } else {
          return todayBook.description;
        }
      } else {
        if (todayBook.description && todayBook.description.length >= 55) {
          return todayBook.description.substr(0, 55) + "...";
        } else {
          return todayBook.description;
        }
      }
    }else{
      return todayBook.author +" "+ todayBook.pubDate
    }
    
  };

  useEffect(() => {
    todayBook !== null && setIsLoading(false);
  }, [todayBook]);

  useEffect(() => {
    (async()=>{
      try{
        const data = await ListUpBooks()
        setTodayBook(data.item[randomNum]);
        setIsApiConnecgted(true)
      }catch(error){
        console.error("Error 에러")
        setIsApiConnecgted(false)
        randomNum = Math.floor(Math.random() * 3);
        let { BannerBookList } = BookGeneration 
        setTodayBook(BannerBookList[randomNum]);
      }
    })()
  }, []);

  // useEffect(() => {
  //   setDiaMessageTitle("데이터 오류");
  //   setDiaMessageDesc("페이지를 새로고침 할까요?");
  // }, []);



  if (isLoading) {
    return <Loading />;
  }else {
    return (
      <div>
        <motion.div
          animate={{y:3, x:3 , opacity: 1}}
          transition={{duration:0.25}}
          style={{
            opacity: 0,
          }}
        >
        <BannerSection>
          <div className="BannerCt">
            <div
              onClick={() => {
                window.open(todayBook.link);
              }}
              className="imgCt"
            >
              <img
                src={
                  isApiConnected ? 
                  todayBook.cover :
                  book1
                }
                alt={todayBook.title}
              ></img>
            </div>
            <div className="contentCt">
              <Title className="title" variant="subtitle2">
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: false,
                    delay: 50,
                    // cursor: !isTypingDone ? '|' : '',
                    cursor: ""
                  }}
                  deleteAll
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(todayBook.title)
                      .callFunction(() => {
                        console.log('Title is typed out!');
                        setIsTypingDone(true)
                      })
                      .start();
                  }}
                />
                </Title>

                {isTypingDone &&
                  <motion.div
                    animate={{y:5 , opacity: 1}}
                    transition={{duration:1}}
                    style={{
                    opacity: 0,
                    width: 300
                    }}
                  >
                    <Typography className="content" color={"black"} variant="h8">
                      {handleLength()}
                    </Typography>
                </motion.div>                 
                }

              {todayBook.link && (
                <InfoBtn
                  // color="primary"
                  // variant="soft"
                  className="urlBtn"
                  onClick={() => {
                    window.open(todayBook.link);
                  }}
                >
                  <ExitToAppIcon fontSize="small"/>
                  책 정보
                </InfoBtn>
              )}
            </div>
          </div>
        </BannerSection>
        </motion.div>
        
      </div>
    );
  }
  
}

const MyChip = styled(Button)`
  font-size: 18px;
  font-weight: 600;
  padding: 5px 30px;
  margin-bottom: 10px;
  z-index: 2;
  margin: 0px auto 10px;

  .icon {
    width: 45px;
    height: 45px;
    margin: 5px;
  }
  @media (min-width: 481px) {
    margin: 0px auto 50px;
  }
`;

const Title = styled(Typography)`
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 10px;
  word-break: keep-all;
  text-align: center;
  color: #888;

  @media (min-width: 481px) {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #000;
    width: 300px;
    text-align: left;
    word-break: keep-all;
    margin-bottom: 50px;
    line-height: 36px;
  }

  @media (max-width: 480px){
    
  &.title{
    line-height: 30px;
    letter-spacing: -0.5px;
    color: #1a1a1a;
  }
  }
`;

const BannerSection = styled.div`
  z-index: 1;
  color: #fff;
  font-weight: bold;
  width: 100%;
  height: 100vh;

  padding: 60px 50px 40px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  overflow: hidden;
  & .BannerCt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .imgCt {
      margin: 10px;
      width: 150px;
      height: fit-content;

      position: relative;
      z-index: 1;

      &:after {
        content: "";
        width: 280px;
        height: 280px;
        background: #e6f2ffbf;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 300px;
        transform: translate(-50%, -50%);
        z-index: -1;
      }

      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }

      img {
        width: 100%;
        box-shadow: 2px 3px 10px #b6b6b6;
      }
    }

    .contentCt {
      padding: 20px 10px;
      display: flex;
      flex-direction: column;

      .content {
        width: 250px;
        color: #555;
        word-break: keep-all;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
      }
      .urlBtn {
        margin: 20px 0 0 auto;
      }
    }

    @media (min-width: 481px) {
      flex-direction: row;
      min-height: 380px;
      .imgCt {
        width: 250px;
        margin-right: 150px;
        &:after {
          width: 380px;
          height: 380px;
          border-radius: 300px;
        }
      }
      .contentCt {
        height: 100%;
        text-align: left;
        align-items: start;
        .content {
          width: 300px;
          font-size: 17px;
          line-height: 20px;
          font-weight: 400;
        }
      }
    }
  }
`;


const InfoBtn = styled(Button)`
  background-color: transparent;
  color: #1f1f1f;

  & svg{
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  
  &:hover{
    background-color: dodgerblue;
    color: #fff;
  }
`