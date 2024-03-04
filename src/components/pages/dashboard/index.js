import { useContext, useState } from "react";
import { LoginContext } from "../../../utils/providers/login/LoginContext";
import GlobalHeader from "../../organisms/GlobalHeader";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { removeFavorite } from "../../../actions";
import { isBrowser } from "react-device-detect";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ToastMessage from "../../templates/ToastMessage";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function DashBoard() {
  const { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);

  const dispatch = useDispatch();

  const favoriteList = useSelector((state) => state.favorites.favorites);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleToastMessage = () => {
    setToastMessage("❌ 관심 도서 목록에서 삭제했습니다");
    setShowToast((prev) => !prev);
  };

  const handleLength = (item) => {
    if (item.contents.length >= 150) {
      return item.contents.substring(0, 50) + "...";
    } else {
      return item.contents;
    }
  };

  const handleRemoveFavorite = (item) => {
    dispatch(removeFavorite(item));
  };

  return (
    <Box>
      <GlobalHeader />
      <UserInfoCt>
        <Avatar
          variant={isBrowser ? "square" : "circular"}
          sx={
            isBrowser
              ? { width: 200, height: 200 }
              : { width: 100, height: 100 }
          }
        />
        <UserInfoTextCt>
          <UseruserNickNameText>{userInfo.userNickName}</UseruserNickNameText>
          <UserIdText>{userInfo.userId}</UserIdText>
          <UserUUIDText>{userInfo.userUUID}</UserUUIDText>

          <Chip
            className="chip"
            icon={<BookmarkAddedIcon />}
            label={favoriteList.length}
            size="medium"
            color="primary"
            variant="soft"
          />
        </UserInfoTextCt>
      </UserInfoCt>

      <Divider />

      <div>
        <FavBookTitle>나의 관심 도서</FavBookTitle>
        <MyGrid container>
          {favoriteList.map((item) => (
            <MyGridItem
              item
              sx={{
                boxShadow: 3,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#101010" : "#fff",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                p: 1,
                m: 1,
                fontWeight: "700",
              }}
              xs={isBrowser ? 3.5 : 8}
            >
              <img
                className="bookImg"
                src={item.thumbnail}
                variant="rounded"
                onClick={() => {
                  window.open(item.url);
                }}
              />
              <Typography variant="h5" className="title">
                {item.title}
              </Typography>
              <Typography className="content" variant="body1">
                {handleLength(item)}
              </Typography>
              <Typography className="authors">
                작가 : {item.authors} <br /> 출판사 : {item.publisher}
              </Typography>

              <BtnGroup>
                <Button
                  onClick={() => {
                    handleRemoveFavorite({ item });
                    handleToastMessage();
                  }}
                >
                  <DeleteForeverIcon color="error" />
                </Button>
                <Button
                  onClick={() => {
                    window.open(item.url);
                  }}
                >
                  <OpenInNewIcon color="primary" />
                </Button>
              </BtnGroup>
            </MyGridItem>
          ))}
        </MyGrid>
      </div>
      {showToast && (
        <ToastMessage text={toastMessage} setShowToast={setToastMessage} />
      )}
    </Box>
  );
}

const MyGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #dcdcdc;

  background: #fff;
  margin: 10px auto;
  border-radius: 10px;

  p {
    margin: 10px 0;
    word-break: keep-all;
  }
  img {
    margin: 10px auto;
    width: 120px;
    min-height: 280px;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
    &:hover {
      cursor: pointer;
    }
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    word-break: keep-all;
    text-align: center;
  }
  .content {
    font-size: 14px;
    letter-spacing: -0.5px;
    line-height: 17px;
    color: #000;
  }
  .authors {
    font-size: 12px;
    letter-spacing: -1px;
  }

  @media (min-width: 481px) {
    min-height: 600px;
    max-height: 800px;
    margin: 10px;

    img {
      width: 100%;
      max-width: 180px;
      &:hover {
        cursor: pointer;
      }
    }
    .title {
      margin: 10px 0;
      font-size: 20px;
      font-weight: bold;
      word-break: keep-all;
      text-align: center;
    }
    .content {
      padding: 0 10px;
      font-size: 16px;
      letter-spacing: -0.5px;
      line-height: 20px;
      color: #000;
    }
    .authors {
      font-size: 14px;
      letter-spacing: 0px;
    }
  }
`;

const UserInfoCt = styled(Box)`
  display: flex;
  padding: 30px;
`;

const UserInfoTextCt = styled(Box)`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .chip {
    width: 100px;
    margin: 10px 0;
  }
`;

const UseruserNickNameText = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
`;
const UserIdText = styled(Typography)`
  font-size: 20px;
  font-weight: 400;
`;
const UserUUIDText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
`;

const FavBookTitle = styled(Typography)`
  padding: 5px 10px;
  font-size: 16px;
  font-weight: 800;
  // background: #99ccff2e;
  color: #1f8fff;
`;

const MyGrid = styled(Grid)`
  // background: #99ccff2e;
  min-height: 90vh;

  @media (min-width: 481px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;

  margin-top: auto;
  & button {
    margin: 2px;

    &:first-child {
      margin-left: auto;
    }
  }
`;
