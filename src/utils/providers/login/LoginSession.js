import React, { useContext, useEffect } from "react";
import uuid from "react-uuid";
import { LoginContext } from "./LoginContext";

const userData = [];

// sessionStorage
export function LoginSessionGet() {
  //   set은 key value
  return sessionStorage.getItem("loginState") === "true";
}

// 로그인 유지를 위한 세션
export function LoginSessionSet(id, nickname, uuid, loginState) {
  //   set은 key
  //   const loginNow = { id, pw, nickname, uuid, loginNow };

  if (loginState) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("uuid", uuid);
    sessionStorage.setItem("loginState", loginState);
    return;
  }
}

export function LogoutSession() {
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("nickname");
  sessionStorage.removeItem("uuid");
  sessionStorage.removeItem("loginState");
  return false;
}

// localstorage
export function LoginLocalGet() {
  const getData = JSON.parse(localStorage.getItem("user"));
  return getData;
}
export function LoginlocalSet(id, pw, nickname, uuid) {
  userData.push({ id, pw, nickname, uuid });
  const getData = localStorage.setItem("user", JSON.stringify(userData));
}
