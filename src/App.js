import React, { useEffect } from "react";

//pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Main/Main";
import Camera from "./pages/Camera/Camera";
import Preview from './pages/Preview/Preview';
import Socket from './pages/Socket/Socket';

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
          <Route path="/Home" element={<BackgroundWhite><Home /></BackgroundWhite>}></Route>
          <Route path="/Camera" element={<Background><Camera /></Background>}></Route>
          <Route path="/Preview" element={<Background><Preview /></Background>}></Route>
          <Route path="/socket" element={<Socket />}></Route>

          <Route exact path="/kakao/callback" element={<KakaoRedirection />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
