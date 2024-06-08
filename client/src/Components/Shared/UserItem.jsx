import { Add as AddIcon} from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React,{memo} from 'react'

const UserItem = ({user, handler, handlerLoading}) => {
    const {name, _id, avatar} = user;
    return (
      <ListItem>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          width={"100%"}
        >
          <Avatar src={avatar[0]}/>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {name}
          </Typography>
          <IconButton
            onClick={() => handler(_id)}
            disabled={handlerLoading}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </ListItem>
    );
}

export default memo(UserItem)