import { Box, Typography, useMediaQuery } from "@mui/material";
import Navbar from "components/navbar";
import React from "react";

function Chats() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Typography variant="h1" component="h2">
          Chats
        </Typography>
      </Box>
    </Box>
  );
}

export default Chats;
