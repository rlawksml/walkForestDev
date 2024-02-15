import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React from "react";
import KakaoMap from "../../map/KakaoMap";
import LibararyData from "../../../../utils/LibararyData";
import { isBrowser } from "react-device-detect";

export default function MapSection() {
  return (
    <Grid container>
      <Grid xs={isBrowser ? 7 : 12}>
        <KakaoMap />
      </Grid>
      <Grid xs={isBrowser ? 4 : 12}>
        <LibararyData />
      </Grid>
    </Grid>
  );
}
