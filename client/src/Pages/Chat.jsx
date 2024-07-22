import React, { useRef, useState, useCallback } from "react";
import AppLayout from "../Components/Layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../Components/Style/StyledComponent";
import { Center, Dgreen } from "../Constants/Color";
import FileMenu from "../Components/Dialogs/FileMenu";
import { sampleMessage } from "../Constants/Sample";
import MessegeComponent from "../Components/Shared/MessegeComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../Constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../Hooks/hooks";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";

function Chat({ chatId, user }) {
  const containerRef = useRef(null);
  const socket = getSocket();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const dispatch = useDispatch();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  const members = chatDetails?.data?.chat?.members;
  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const eventHandler = {
    // [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    // [START_TYPING]: startTypingListener,
    // [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };
  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        sx={{
          overflowX: "auto",
          overflowY: "auto",
          backgroundImage:
            "linear-gradient(180deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
        }}
      >
        {allMessages.map((i, index) => (
          <MessegeComponent message={i} key={index} user={user} />
        ))}
      </Stack>
      <form
        style={{ height: "10%", backgroundColor: "#0093E9" }}
        onSubmit={submitHandler}
      >
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
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here....  "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

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
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  );
}

export default AppLayout()(Chat);
