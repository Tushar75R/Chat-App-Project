import React,{ useRef} from 'react'
import AppLayout from '../Components/Layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { AttachFile as AttachFileIcon, Send as SendIcon} from '@mui/icons-material';
import { InputBox } from '../Components/Style/StyledComponent';
import { Center, Dgreen } from "../Constants/Color";
import FileMenu from '../Components/Dialogs/FileMenu';
import { sampleMessage } from '../Constants/Sample';
import MessegeComponent from '../Components/Shared/MessegeComponent';

function Chat() {
  const containerRef = useRef(null);
  const user = {
    _id : "sfsnfa",
    name : "Tushar75R"
  }
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "hidden",
          backgroundImage:
            "linear-gradient(180deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
        }}
      >
        {sampleMessage.map((i, index) => (
          <MessegeComponent message={i} key={index} user={user} />
        ))}
      </Stack>
      <form style={{ height: "10%", backgroundColor: "#0093E9" }}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Type Message Here....  " />

          <IconButton
            type="submit"
            sx={{
              bgcolor: Center,
              color: "#95009A",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: Dgreen,
                rotate: "-30deg",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      {/* <FileMenu /> */}
    </>
  );
}
 
export default AppLayout()(Chat); 