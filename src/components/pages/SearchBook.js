import React, { useState } from "react";
import BookList from "../templates/mainContent/BookList/BookList";
import GlobalHeader from "../organisms/GlobalHeader";
import { Container } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import YoutubeList from "../templates/mainContent/BookList/YoutubeList";
import Login from "../templates/login/Login";
import ToastMessage from "../templates/ToastMessage";
import MainSearch from "../organisms/MainSearch";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SearchBook({ isLoggedIn }) {
  const [loginPopState, setLoginPopState] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [openMessage, setOpenMeesage] = useState(false);

  const handleLoginPop = () => {
    setLoginPopState((prev) => !prev);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <GlobalHeader
        isLoggedIn={isLoggedIn}
        loginPopState={loginPopState}
        handleLoginPop={handleLoginPop}
      />
      <MyContainer maxWidth={"sm"}>
        <MainSearch searchClass={"subPage"} />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="책으로보기" {...a11yProps(0)} />
              <Tab label="유튜브로보기" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <BookList
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <YoutubeList />
          </CustomTabPanel>
        </Box>
      </MyContainer>

      {showToast && (
        <ToastMessage
          text={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}

      {loginPopState && (
        <Login
          setToastMessage={setToastMessage}
          setOpenMeesage={setOpenMeesage}
          setLoginPopState={setLoginPopState}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fbfcff;
  height: 100vh;
`;

const MyContainer = styled(Container)`
  padding: 30px;
`;
