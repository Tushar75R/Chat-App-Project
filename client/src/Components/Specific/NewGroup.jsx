import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleuser } from '../../Constants/Sample';
import UserItem from '../Shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroup = () => {
  const groupName = useInputValidation("");


  const [members, setMembers] = useState(sampleuser);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => { 
    setSelectedMembers(prev => prev.includes(id)?prev.filter(i => i !== id): [...prev, id])
  }
  console.log(selectedMembers);
  const submitHandler = () => {}

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} >
        <DialogTitle textAlign={"center"}>
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1" textAlign={"center"} margin={"1rem"}>
          Members
        </Typography>
        <Stack>
          {members.map((i) => (
            <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"} marginTop={"2rem"}>
          <Button color="error" variant="text" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default NewGroup