import { useContext } from "react";
import { LoginContext } from "../../../utils/providers/login/LoginContext";
import GlobalHeader from "../../organisms/GlobalHeader";
import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { removeFavorite } from "../../../actions";

export default function DashBoard() {
  const { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);

  const dispatch = useDispatch();

  const favoriteList = useSelector((state) => state.favorites.favorites);

  const handleRemoveFavorite = (item) => {
    dispatch(removeFavorite(item));
  };

  return (
    <>
      <GlobalHeader />
      <Typography>유저 닉네임 : {userInfo.userNickName}</Typography>
      <Typography>유저 아이디 : {userInfo.userId}</Typography>
      <Typography>유저 인식번호 : {userInfo.userUUID}</Typography>
      <Divider />

      <div>
        <Typography>유저의 장바구니</Typography>
        <Typography>선호 아이템</Typography>

        <Grid container>
          {favoriteList.map((item) => (
            <MyGridItem item xs={4}>
              <Typography variant="h5" className="title">
                제목 : {item.title}
              </Typography>
              <Typography variant="body1">
                시놉시스 : {item.contents}
              </Typography>
              <Typography></Typography>
              <Typography>
                작가 : {item.authors} | 출판사 : {item.publisher}
              </Typography>
              <img
                src={item.thumbnail}
                variant="rounded"
                onClick={() => {
                  window.open(item.url);
                }}
              ></img>
              <Button
                onClick={() => {
                  handleRemoveFavorite({ item });
                }}
              >
                <DeleteForeverIcon color="error" />
              </Button>
            </MyGridItem>
          ))}
        </Grid>
      </div>
    </>
  );
}

const MyGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 8px 30px;

  p {
    margin: 10px 0;
    word-break: keep-all;
  }
  img {
    margin: 10px;
    width: 150px;
    &:hover {
      cursor: pointer;
    }
  }

  button {
    margin-left: auto;
    background: #dcdcdc;
  }
`;
