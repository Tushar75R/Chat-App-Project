import React,{Suspense, lazy} from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtechRouter from "./Components/Auth/ProtechRouter";
import { LayoutLoader } from "./Components/Layout/Loaders";

const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import("./Pages/Login"));
const Chat = lazy(() => import("./Pages/Chat"));
const Groups = lazy(() => import("./Pages/Groups"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin"))
const DashBoard = lazy(() => import("./Pages/Admin/DashBoard"));
const UserManagement = lazy(() => import("./Pages/Admin/UserManagement"));
const MessageManagement = lazy(() => import("./Pages/Admin/MessageManagement"));
const ChatManagement = lazy(() => import("./Pages/Admin/ChatManagement"));

function App() {
 let user = true
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtechRouter user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtechRouter user={!user} redirect="/">
                <Login />
              </ProtechRouter>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<DashBoard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
