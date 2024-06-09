import React from 'react'
import AppLayout from '../Components/Layout/AppLayout'
import { Stack, Typography } from '@mui/material';

const Home = () => {
  return (
      <Stack
        sx={{
          backgroundImage:
            "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 62%, #2BFF88 90%)",
        }}
        height={"100%"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h1" color={"blue"}>
          P
        </Typography>
        <Typography variant="h1">- chat</Typography>
      </Stack>
  );
}

export default AppLayout()(Home); 