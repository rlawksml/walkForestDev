import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../utils/providers/modal/ModalContext";
import { useContext } from "react";

export default function DropMenu({ open, anchorEl, setAnchorEl }) {
  const navigate = useNavigate();

  // faq
  const { setModalOpen } = useContext(ModalContext);

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem
          onClick={() => {
            navigate("/mybox");
            handleClose();
          }}
        >
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>{" "}
          보관함
        </MenuItem>

        <MenuItem
          onClick={() => {
            setModalOpen((prev) => !prev);
            handleClose();
          }}
        >
          <ListItemIcon>
            <HelpCenterIcon fontSize="small" />
          </ListItemIcon>
          FAQ
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      </Menu>
    </>
  );
}
