import styled from "styled-components";
import MenuTools from "@mui/icons-material/ManageSearch";
import { Button } from "@mui/joy";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import DropMenu from "../templates/menus/DropMenu";
import SideMenu from "../templates/menus/SideMenu";
import { useLocation, useNavigate } from "react-router";
import Divider from "@mui/joy/Divider";
import { LoginContext } from "../../utils/providers/login/LoginContext";
import { LoginSessionGetInfo } from "../../utils/providers/login/LoginSession";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function GlobalHeader({ handleLoginPop }) {
  let { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);

  // 로그인 드랍 메뉴
  const [anchorEl, setAnchorEl] = useState(null);
  const DropOpen = Boolean(anchorEl);

  // 생성 메뉴
  const [sideMenuShow, setSideMenuShow] = useState(false);

  // 로그인 드랍메뉴
  const handleDropMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const { userId, useruuid, nickname } = LoginSessionGetInfo();

  useEffect(() => {}, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyAppBar position="static">
        {isBrowser ? (
          <Container maxWidth={"lg"}>
            <MyToolBar>
              {location.pathname !== "/" ? (
                <MyMenu
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menuSearch"
                  sx={{ mr: 2 }}
                  onClick={(e) => {
                    navigate(-1);
                  }}
                >
                  <ArrowBackIosIcon />
                </MyMenu>
              ) : (
                <></>
              )}

              <Typography
                align="center"
                variant="h8"
                component="div"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <Typography variant="h6">📖 BOOK-ROAD</Typography>
              </Typography>
              {isLogined ? (
                <MyMenu
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={(e) => {
                    handleDropMenu(e);
                  }}
                >
                  <Avatar sx={{ width: 35, height: 35 }} />
                  <Typography className="username" variant="h6">
                    {userInfo.userNickName !== ""
                      ? userInfo.userNickName
                      : "사용자"}
                  </Typography>
                </MyMenu>
              ) : (
                <LoginBtn
                  color="white"
                  disabled={false}
                  onClick={(e) => {
                    handleLoginPop(e);
                  }}
                  size="sm"
                  variant="soft"
                >
                  로그인
                </LoginBtn>
              )}
            </MyToolBar>
          </Container>
        ) : (
          <MyToolBar>
            {location.pathname !== "/" ? (
              <MyMenu
                size="large"
                edge="start"
                color="inherit"
                aria-label="menuSearch"
                sx={{ mr: 2 }}
                onClick={(e) => {
                  navigate(-1);
                }}
              >
                <ArrowBackIosIcon />
              </MyMenu>
            ) : (
              <></>
            )}

            <Typography
              align="center"
              variant="h8"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <Typography variant="h6">📖 BOOK-ROAD</Typography>
            </Typography>
            {isLogined ? (
              <MyMenu
                size={isBrowser ? "large" : "small"}
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={(e) => {
                  handleDropMenu(e);
                }}
              >
                {nickname}님
              </MyMenu>
            ) : (
              <LoginBtn
                color="white"
                disabled={false}
                onClick={(e) => {
                  handleLoginPop(e);
                }}
                size="sm"
                variant="soft"
              >
                로그인
              </LoginBtn>
            )}
          </MyToolBar>
        )}
      </MyAppBar>
      {DropOpen && (
        <DropMenu
          open={DropOpen}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleDropMenu={handleDropMenu}
        />
      )}
      {/* {sideMenuShow && <SideMenu setSideMenuShow={setSideMenuShow} />} */}
    </Box>
  );
}

const MyAppBar = styled(AppBar)`
  background: #3cb371;
`;

const MyToolBar = styled(Toolbar)`
  background: #3cb371;
`;

const MyMenu = styled(IconButton)`
  margin-right: 0;
  color: #fff;
  border-radius: 100px;

  & .username {
    margin-left: 10px;
  }

  @media (min-width: 481px) {
    padding: 5px 10px;
  }
`;

const LoginBtn = styled(Button)`
  background: transparent;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  padding-left: 0;
  padding-right: 0;
`;
