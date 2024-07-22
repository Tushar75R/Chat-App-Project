import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Title from "../Shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../Specific/ChatList";
import { samplechats } from "../../Constants/Sample";
import Profile from "../Specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../Hooks/hooks";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isMobile } = useSelector((state) => state.misc);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault;
      console.log(`Delete`);
    };

    const handleMobileClose = () => dispatch(setIsMobile());

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "block" },
              backgroundImage:
                " linear-gradient(163deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              backgroundImage:
                "linear-gradient(200deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
