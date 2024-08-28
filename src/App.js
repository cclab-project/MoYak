import React, { useEffect } from "react";

//pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Main/Main";
import Camera from "./pages/Camera/Camera";
import Preview from './pages/Preview/Preview';
import ChatRoom from "./pages/ChatRoom/ChatRoom";

import Socket from './pages/Socket/Socket';
import PyTest from "./pages/PyTest/PyTest";

import GlobalStyle from './Globalstylel';
import { Background, BackgroundWhite } from './components/Background/Background';

//redirection
import KakaoRedirection from "./pages/Redirection/KakaoRedirection/KakaoRedirection"

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Routes>
          <Route path="/" element={<BackgroundWhite><Login /></BackgroundWhite>}></Route>
          <Route path="/home" element={<BackgroundWhite><Home /></BackgroundWhite>}></Route>
          <Route path="/camera" element={<Background><Camera /></Background>}></Route>
          <Route path="/preview" element={<Background><Preview /></Background>}></Route>
          <Route path="/chatroom" element={<BackgroundWhite><ChatRoom /></BackgroundWhite>}></Route>
          <Route path="/socket" element={<Socket />}></Route>
          <Route path="/pytest" element={<PyTest />}></Route>

          <Route exact path="/kakao/callback" element={<KakaoRedirection />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
