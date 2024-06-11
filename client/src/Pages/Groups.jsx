import React, { memo, useState } from 'react'
import {Grid, IconButton, Tooltip, Box, Drawer, Stack, Typography} from '@mui/material'
import {KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon} from "@mui/icons-material"
import {matBlack} from '../Constants/Color'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Link} from '../Components/Style/StyledComponent'
import AvatarCard from "../Components/Shared/AvatarCard";
import {samplechats} from '../Constants/Sample'
function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const navigation = useNavigate();
  const [isMobileMenu , setisMobileMenu] = useState(false);
  console.log(chatId);
  const handleMobile = () => {
    setisMobileMenu((prev) => !prev);
  }
  const handleMobileClose = () => {
    setisMobileMenu(false);
  }

  const navigatorBack = () => {
    navigation('/')
  }
  const IconBtns = (
    <>
    <Box
      sx={{
        display:{
          sm: 'block',  
          md:"none",
          position:"fixed",
          right:"1rem",
          top:"1rem"
        }
      }}
    >
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover" : {
              bgcolor: "rgba(0,0,0,0.7)"
            }
          }}
          onClick={navigatorBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
      ;
    </>
  );
  return (
    <>
      <Grid height={"100vh"} container>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
          sm={4}
          bgcolor={"bisque"}
        >
          <GroupList myGroups={samplechats} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "1rem 3rem",
          }}
        >
          temp
          {IconBtns}
        </Grid>
        <Drawer open={isMobileMenu} onClose={handleMobileClose}>
          <GroupList w={"50%"} myGroups={samplechats} chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  );
}

const GroupList = ({w = "100%", myGroups = [] , chatId}) => (
  <Stack width={w}>
    {myGroups.length > 0 ?
      (myGroups.map((group) =><GroupListItem group={group} chatId={chatId} key={group._id} />)
    ):(
      <Typography textAlign={"center"} padding={"1rem"}> No Groups</Typography>
    )}
  </Stack>
)

const GroupListItem = memo(({group, chatId}) => {
  const {name, avatar, _id} = group;
  return (
    <Link to={`?group=${_id}`} onClick={(e) => {
      if(_id === chatId){
        e.preventDefault();
      }
    }}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}> 
        <AvatarCard avatar={avatar} />
        <Typography> {name}</Typography>
      </Stack>
    </Link>
  );
})

export default Groups