import React, { memo, useState, useEffect, lazy, Suspense } from 'react'
import {Grid, IconButton, Tooltip, Box, Drawer, Stack, Typography, TextField, Button, Backdrop} from '@mui/material'
import {KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon, Edit as EditIcon, Done as DoneIcon, Delete as DeleteIcon, Add as AddIcon} from "@mui/icons-material"
import {matBlack} from '../Constants/Color'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Link} from '../Components/Style/StyledComponent'
import AvatarCard from "../Components/Shared/AvatarCard";
import {samplechats, sampleuser} from '../Constants/Sample'
import UserItem from '../Components/Shared/UserItem'

const ConfirmDeleteDialog = lazy(() => import('../Components/Dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../Components/Dialogs/AddMemberDialog'))

function Groups() {
  const chatId = useSearchParams()[0].get("group");
  const navigation = useNavigate();
  const [isMobileMenu , setisMobileMenu] = useState(false);
  const [isEdit , setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const isMemberAdd = false;
  const handleMobile = () => {
    setisMobileMenu((prev) => !prev);
  }
  const handleMobileClose = () => {
    setisMobileMenu(false);
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }
  const openAddMemberHandler = () => {

  }
  const deleteHandler = () => {
    closeConfirmDeleteHandler();
  }

  const navigatorBack = () => {
    navigation('/')
  }
  const updateGroupName = () => {
    setIsEdit(false)
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

    </>
  );
  const removeMemberHandler = (id) => {
    console.log(`Removing ${id}`);
  }

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButttonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row"
      }}
      spacing={"1rem"}
      p={{
        xs:"0",
        sm:"1rem",
        md:"1rem 4rem"
      }}
      margin={"1rem"}
    >
      <Button size="large" variant='outlined' color="error" startIcon={<DeleteIcon />} onClick={openConfirmDeleteHandler}>
        Delete Group
      </Button>
      <Button size='large' variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler}>
        Add Member
      </Button>

    </Stack>
  )

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
          {IconBtns}

          {groupName && (
            <>
              {GroupName}
              <Typography margin={"2rem"} alignSelf={"center"} variant="h5">
                members
              </Typography>
              <Stack
                maxWidth={"40rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  ms: "1rem 4rem",
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
              >

                {sampleuser.map((i) => (
                  <UserItem 
                    key={i._id}
                    user={i} 
                    isAdded 
                    styling={{ 
                      boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)"
                      ,padding: "1rem 2rem"
                      ,borderRadius: "1rem"
                  }}
                    handler={removeMemberHandler}
                  />
                ))}
              </Stack>
              {ButttonGroup}
            </>
          )}
        </Grid>
        {isMemberAdd && (
          <Suspense fallback={<Backdrop open />}>
            {" "}
            <AddMemberDialog />
          </Suspense>
        )}
        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )}

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