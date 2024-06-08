import { AlternateEmail as UserNameIcon, Face as FaceIcon, CalendarMonth as CalendarIcon} from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid black",
        }}
      />
      <ProfileCard heading={"Bio"} text={"This is random text"} />
      <ProfileCard
        heading={"Username"}
        text={"Tushar75R"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard
        heading={"Name"}
        text={"Tushar vavdiya"}
        Icon={<FaceIcon />}
      />
      <ProfileCard
        heading={"Joined"}
        text={moment('2001-09-21T00:00:00.000Z').fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
}

const ProfileCard = ({text, Icon, heading}) => {
    return <Stack 
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"black"}
        textAlign={"center"}
    >
        {Icon && Icon}
        <Stack>
            <Typography variant='bady1'> {text}</Typography>
            <Typography color={"gray"} variant='caption'>{heading}</Typography>
        </Stack>
    </Stack>
}
export default Profile