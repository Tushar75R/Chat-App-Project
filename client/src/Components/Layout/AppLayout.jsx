import React from 'react'
import {useParams} from 'react-router-dom'
import Header from './Header'
import Title from '../Shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../Specific/ChatList'
import { samplechats } from '../../Constants/Sample'
import Profile from '../Specific/Profile'

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const handleDeleteChat = (e, _id, groupChat) =>{
          e.preventDefault;
          console.log(`Delete`);
        }
        return (
          <>
            <Title />
            <Header />

            <Grid container height={"calc(100vh - 4rem)"}>
              <Grid
                item
                sm={4}
                md={3}
                height={"100%"}
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                <ChatList
                  chats={samplechats}
                  chatId={chatId}
                  newMessagesAlert={[{ chatId: "1", count: 4 }]}
                  onlineUsers={["1", "2"]}
                  handleDeleteChat={handleDeleteChat}
                />
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
                    "linear-gradient(315deg, #2AF598 2%, #08AEEA 51%, #fa8bff 99%)",
                }}
                height={"100%"}
              >
                <Profile />
              </Grid>
            </Grid>
          </>
        );
    }
}

export default AppLayout