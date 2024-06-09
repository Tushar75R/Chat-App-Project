import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotification } from "../../Constants/Sample";

const Notifications = () => {
  const friendRequestHandler = ({_id, accept}) => {

  }
  return (
    <Dialog open >
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"50rem"}>
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
        {sampleNotification.length > 0 ? (
          sampleNotification.map(({ sender, _id }) => 
          <NotificationsItem 
            sender={sender} 
            _id={_id}
            handler={friendRequestHandler}
            key={_id}
          />)
        ) : (
          <Typography textAlign={"center"}> No Notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationsItem = memo(({ sender, _id, handler }) => {
  const {name, avatar} = sender
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
         <div style={{margin: "0px"}}><div style={{fontSize:"1.5rem"}}>{name}</div> sends you friend request</div>
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
