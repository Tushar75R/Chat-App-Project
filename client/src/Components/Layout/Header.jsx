import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import { blue } from '../../Constants/Color'
import {Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as ManiIcon, Notifications as NotificationsIcon, Search as SearchIcon} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
const Search = lazy(() => import("../Specific/Search"));
const Notifications = lazy( () =>  import('../Specific/Notifications'))

function Header() {

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  
  
  const handleMobile = ()=>{
    setIsMobile(prev => !prev)
  }
  const openSerch = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  const NavigateToGroup = () => navigate('/groups')
  const LogoutHandler = () =>{
    console.log("logout");
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: blue,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" }, cursor:'pointer' } }
            >
              P-chat
            </Typography>
            <Box
              sx={{
                display: { sx: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <ManiIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"search"}
                icon={<SearchIcon />}
                onClick={openSerch}
              />
              <IconBtn
                title={"Add new Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={NavigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title={"LogOut"}
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notifications />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({title, icon, onClick}) =>{
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header