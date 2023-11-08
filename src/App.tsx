import React from "react";
import Layout from "./components/common/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import LoginResult from "./pages/LoginResult";
import MainPage from "./pages/MainPage";
import MessageListPage from "./pages/MessageListPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/LoginResult" element={<LoginResult />}></Route>
          <Route path="/signIn" element={<SignInPage />}></Route>
          <Route path="/:userId" element={<MainPage />} />
          <Route path="/messages" element={<MessageListPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
