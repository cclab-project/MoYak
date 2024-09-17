import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import testImg from "../../assets/testImg.png";

import {
  Header,
  BackButton,
  MenuButton,
  HeaderTitle,
  Body,
  MoyakImg,
  PillImgBox,
  PillImg,
  PillName,
  PillIngredient,
  LeftSpeechBubble,
  RightSpeechBubble,
  TextBox,
  Bottom,
  InputContainer,
  InputBox,
  SendBox,
  SendImg,
} from "./style";

import LoadingDots from "../../components/Loading/LoadingDot";

const ChatRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { responseData } = location.state || {};
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!responseData) {
      alert("다시 시도해주세요.");
      // navigate("/camera");
      return;
    }

    const sendPostRequest = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/chat/${responseData}`
        );
        setData(response.data.eachPills);
      } catch (err) {
        console.log(err);
      }
    };

    sendPostRequest();
  }, []);

  const [bodyHeight, setBodyHeight] = useState(window.innerHeight - 110);

  useEffect(() => {
    const handleResize = () => {
      setBodyHeight(window.innerHeight - 110);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //gpt질문하기
  const [inputText, setInputText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionData, setQuestionData] = useState("");
  const [questionLoding, setQuestionLoding] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const addItem = (newItem) => {
    setChatHistory((prevItems) => [...prevItems, newItem]);
  };
  const QuestionRequest = async () => {
    setQuestionLoding(true);
    addItem({
      role: "user",
      content: inputText,
    });
    setInputText("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/chat/${responseData}`,
        {
          question: questionText,
        }
      );
      setQuestionData(response.data);
      console.log(response.data);
      addItem(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setQuestionLoding(false);
    }
  };

  return (
    <>
      <Header>
        <BackButton />
        <HeaderTitle>{data.title}</HeaderTitle>
        <MenuButton />
      </Header>
      <Body $height={bodyHeight}>
        <LeftSpeechBubble>
          <MoyakImg />
          <TextBox>
            {data.map((list, index) => (
              <PillImgBox key={index}>
                <PillImg src={list.image} alt="testImg" />
                <PillName>
                  {list.pill_name}
                  <PillIngredient>{list.pill_ingredient}</PillIngredient>
                </PillName>
              </PillImgBox>
            ))}
          </TextBox>
        </LeftSpeechBubble>
        {chatHistory.map((list, key) => (
          <div key={key}>
            {list.role === "assistant" && (
              <LeftSpeechBubble>
                <MoyakImg />
                <TextBox>{list.content}</TextBox>
              </LeftSpeechBubble>
            )}
            {list.role === "user" && (
              <RightSpeechBubble>
                <TextBox>{list.content}</TextBox>
              </RightSpeechBubble>
            )}
          </div>
        ))}
        {questionLoding && (
          <LeftSpeechBubble>
            <MoyakImg />
            <TextBox>
              <LoadingDots />
            </TextBox>
          </LeftSpeechBubble>
        )}
      </Body>
      <Bottom>
        <InputContainer>
          <InputBox
            type="text"
            placeholder="질문을 입력하세요"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setQuestionText(e.target.value);
            }}
          />
        </InputContainer>
        <SendBox onClick={QuestionRequest} $disable={questionLoding}>
          <SendImg />
        </SendBox>
      </Bottom>
    </>
  );
};

export default ChatRoom;
