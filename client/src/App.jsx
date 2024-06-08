import React,{Suspense, lazy} from "react"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtechRouter from "./Components/Auth/ProtechRouter";
import { LayoutLoader } from "./Components/Layout/Loaders";

const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import("./Pages/Login"));
const Chat = lazy(() => import("./Pages/Chat"));
const Groups = lazy(() => import("./Pages/Groups"));
const NotFound = lazy(() => import("./Pages/NotFound"));

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
