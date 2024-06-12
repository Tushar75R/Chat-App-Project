import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React,{useState} from 'react'
import { sampleuser } from '../../Constants/Sample'
import UserItem from '../../Components/Shared/UserItem'

const AddMemberDialog = ({addMember, isLoadingAddMember, chatId}) => {

    const [members, setMembers] = useState(sampleuser);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const addMemberSubmitHandler = () => {
        
  }
  const closeHandler = () => {
    setSelectedMembers([])
    setMembers([]);  
  }

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
    return (
      <Dialog open onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
          <DialogTitle textAlign={"center"}> Add Member</DialogTitle>
          <Stack spacing={"1rem"} >
            {members.length > 0 ? (
              members.map((i) => (
                <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
              ))
            ) : (
              <Typography textAlign={"center"}> No Friends</Typography>
            )}
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button color="error" onClick={closeHandler}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={isLoadingAddMember}
                onClick={addMemberSubmitHandler}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Dialog>
    );
}

export default AddMemberDialog