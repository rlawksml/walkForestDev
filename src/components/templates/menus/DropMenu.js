import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { json, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../utils/providers/modal/ModalContext";
import { useContext } from "react";
import { LoginContext } from "../../../utils/providers/login/LoginContext";
import { LogoutSession } from "../../../utils/providers/login/LoginSession";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function DropMenu({ open, anchorEl, setAnchorEl }) {
  const navigate = useNavigate();

  let { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);
  // faq
  const { setModalOpen } = useContext(ModalContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setIsLogined(false);
    navigate("/");
    handleClose();
    LogoutSession();
  };

  const reign = () => {
    const getData = JSON.parse(localStorage.getItem("user"));
    const updateUesrList = getData?.filter(
      (item) => item.id !== userInfo.userId
    );
    localStorage.setItem("user", JSON.stringify(updateUesrList));
    handleLogOut();
    return;
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>{" "}
          나의 정보
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => {
            handleLogOut();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate("/");
            reign();
          }}
        >
          <ListItemIcon>
            <SentimentVeryDissatisfiedIcon fontSize="small" />
          </ListItemIcon>{" "}
          탈퇴
        </MenuItem>
      </Menu>
    </>
  );
}
