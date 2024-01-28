import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import Logo from "../../../assets/images/Logo_MESsie.svg";
import styled from "styled-components";
import { Typography } from "@mui/material";

export default function SideMenu({ setSideMenuShow }) {
  const [DrawerState, setDrawerState] = useState({
    left: true,
  });

  // 생성 메뉴
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...DrawerState, [anchor]: open });
    setSideMenuShow((prev) => !prev);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(anchor, false)}>
            <ListItemIcon>
              {/* <img src={Logo} alt={"MESsie"} /> */}
              {/* <Typography variant="h8">숲속으로</Typography> */}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          {/* <ListItemText primary={"생성"} /> */}

          <AccordionGroup
            sx={{
              maxWidth: 400,
              [`& .${accordionSummaryClasses.indicator}`]: {
                transition: "0.2s",
              },
              [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]:
                {
                  transform: "rotate(45deg)",
                },
            }}
          >
            <Accordion>
              <CusAccordionSummary indicator={<AddIcon />}>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText className="accTitle" primary={"최신 경로"} />
              </CusAccordionSummary>
              <AccordionDetails>
                <ListItemButton onClick={() => {alert("준비중인 서비스입니다.")}}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"산책로"} />
                </ListItemButton>
                <ListItemButton onClick={() => {alert("준비중인 서비스입니다.")}}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"트레킹"} />
                </ListItemButton>
                <ListItemButton onClick={() => {alert("준비중인 서비스입니다.")}}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={"등산"} />
                </ListItemButton>
                
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => {alert("준비중인 서비스입니다.")}}>
            <ListItemIcon>
              <AddToPhotosOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"경로 생성"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {alert("준비중인 서비스입니다.")}}>
            <ListItemIcon>
              <TextsmsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"커뮤니티"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => {alert("준비중인 서비스입니다.")}}>
            <ListItemIcon>
              <WebOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"블로그"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={DrawerState["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}

const CusAccordionSummary = styled(AccordionSummary)`
  & .accTitle {
    margin-left: -14px;
  }
`;
