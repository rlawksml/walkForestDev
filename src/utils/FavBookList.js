import React from "react";

import { LoginSessionGetInfo } from "../utils/providers/login/LoginSession";

// sessionStorage
export function BookListSessionSet(item) {
  const { userId, useruuid, nickname } = LoginSessionGetInfo();
  sessionStorage.setItem(useruuid, JSON.stringify(item));
}

export function BookListSessionGet() {
  const { userId, useruuid, nickname } = LoginSessionGetInfo();
  const FavItem = JSON.parse(sessionStorage.getItem(useruuid));
  return FavItem;
}
