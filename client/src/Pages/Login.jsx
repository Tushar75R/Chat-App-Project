import React, { useState } from 'react'
import {Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography} from '@mui/material'
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../Components/Style/StyledComponent';
import {useFileHandler, useInputValidation} from '6pp'
import { usernameValidator } from '../Utils/validator';

function Login() {
  const [isLogin, setisLogin] =useState(true);
  const toggleLogin = () => setisLogin(prev => !prev);

  const name = useInputValidation("");
  const password = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const bio = useInputValidation("");
  const avatar = useFileHandler("single");

  const handleLogin = (e) =>{
    e.preventDefault();
  }
  const handleSignUp = (e) => {
    e.preventDefault();
  }
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(45,179,50,1) 1%, rgba(111,233,53,1) 15%, rgba(57,242,47,1) 25%, rgba(41,252,165,1) 34%, rgba(39,255,238,1) 58%)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={16}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="username"
                  margin="normal"
                  value={username.value}
                  onChange={username.changeHandler}
                ></TextField>
                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  margin="normal"
                  value={password.value}
                  onChange={password.changeHandler}
                ></TextField>
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
                <Typography textAlign={"center "} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <Stack position={"relative"} width={"7rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "7rem",
                      height: "7rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "0",
                      bottom: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.4)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  value={name.value}
                  onChange={name.changeHandler}
                ></TextField>
                <TextField
                  required
                  fullWidth
                  label="username"
                  margin="normal"
                  value={username.value}
                  onChange={username.changeHandler}
                ></TextField>
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="password"
                  type="password"
                  margin="normal"
                  value={password.value}
                  onChange={password.changeHandler}
                ></TextField>
                <TextField
                  required
                  fullWidth
                  label="bio"
                  margin="normal"
                  value={bio.value}
                  onChange={bio.changeHandler}
                ></TextField>
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
                <Typography textAlign={"center "} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login