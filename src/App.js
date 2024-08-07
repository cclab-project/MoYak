import React, { useEffect } from "react";

//pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Main/Main";
import Camera from "./pages/Camera/Camera";
import GlobalStyle from './Globalstylel';
import Background from './components/Background/Background';
  
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
          <Route path="/" element={<Background><Login /></Background>}></Route>
          <Route path="/Home" element={<Background><Home /></Background>}></Route>
          <Route path="/Home" element={<Background><Camera /></Background>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
