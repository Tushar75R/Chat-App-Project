import React from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { Box, Stack, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#818589",
      }}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"row"} position={"fixed"} sx={{ marginTop: "-8rem" }}>
        <Typography variant="h1">Connect</Typography>
        <Box
          component="img"
          src="./src/assets/Symbol.png"
          sx={{ width: "6rem", height: "6rem", objectFit: "cover" }}
        />
      </Stack>
      <TypeAnimation
        sequence={[
          "Welcome to Connect-O, your ultimate chat experience.",
          1000,
          "Welcome to Connect-O, connect with your friends instantly.",
          1000,
          "Welcome to Connect-O, enjoy secure and fast communication.",
          1000,
        ]}
        speed={60}
        style={{ fontSize: "1.5rem", position: "fixed" }}
        repeat={Infinity}
      />
    </Stack>
  );
};

export default AppLayout()(Home);
