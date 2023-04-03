import React from "react";
import { Avatar, Skeleton, Typography } from "@mui/material";

export default function LoadingPost() {
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }} className="animate-pulse">
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Skeleton width="50%">
          <Typography>.</Typography>
        </Skeleton>
      </div>
      <Skeleton width="100%" height="80px">
        <Typography>.</Typography>
      </Skeleton>
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: "57%", marginTop: "0.5rem" }} />
      </Skeleton>
    </>
  );
}
