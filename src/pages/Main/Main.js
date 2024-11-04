import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Header,
  LogoBox,
  Logo,
  LogoName,
  Body,
  NewChat,
  PlusImg,
  Description,
} from "./style";

import ChatList from "../../components/ChatList/ChatList";

const Main = () => {
  const navigate = useNavigate();

  const cameraHandler = () => {
    navigate("/camera");
  };

  const chatHandler = (chatId) => {
    navigate("/chatroom", {
      state: { responseData: chatId },
    });
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/chat/list?userId=${userId}`
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header>
        <LogoBox>
          <Logo />
          <LogoName>이게모약</LogoName>
        </LogoBox>
      </Header>
      <Body>
        <NewChat onClick={cameraHandler}>
          <PlusImg />
          <Description>새로운 알약 검색</Description>
        </NewChat>
        {isLoading ? (
          <div>로딩중입니다...</div>
        ) : (
          data.map((item, index) => (
            <ChatList key={index} item={item} onClick={chatHandler} />
          ))
        )}
      </Body>
    </>
  );
};

export default Main;
