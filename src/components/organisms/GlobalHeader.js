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
import { useState } from "react";
import { isBrowser } from "react-device-detect";
import DropMenu from "../templates/menus/DropMenu";
import SideMenu from "../templates/menus/SideMenu";
import { useNavigate } from "react-router";
import Divider from "@mui/joy/Divider";

export default function GlobalHeader({ isLoggedIn, handleLoginPop }) {
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyAppBar position="static">
        {isBrowser ? (
          <Container maxWidth={"lg"}>
            <MyToolBar>
              <MyMenu
                size="large"
                edge="start"
                color="inherit"
                aria-label="menuSearch"
                sx={{ mr: 2 }}
                onClick={(e) => {
                  setSideMenuShow((prev) => !prev);
                }}
              ></MyMenu>
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
              {isLoggedIn ? (
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
                    사용자
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
            <MyMenu
              size="large"
              edge="start"
              color="inherit"
              aria-label="menuSearch"
              sx={{ mr: 2 }}
              onClick={(e) => {
                setSideMenuShow((prev) => !prev);
              }}
            >
              {/* <MenuTools /> */}
            </MyMenu>
            <Typography
              align="center"
              variant="h8"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <Typography variant="h6">📖 BOOK-ROAD</Typography>
            </Typography>
            {isLoggedIn ? (
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
                {/* <Avatar sx={{ width: 30, height: 30 }} /> */}
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
