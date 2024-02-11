import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React from "react";
import KakaoMap from "../../map/KakaoMap";
import LibararyData from "../../../../utils/LibararyData";

export default function MapSection() {
  return (
    <Grid container>
      <Grid xs={8}>
        <KakaoMap />
      </Grid>
      <Grid xs={4}>
        <LibararyData />
      </Grid>
    </Grid>
  );
}
