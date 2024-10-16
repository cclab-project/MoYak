import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Dropdown, Modal } from "antd";
import { MenuOutlined } from "@ant-design/icons";
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
        setChatHistory(response.data.chatMessages);
      } catch (err) {
        console.log(err);
      }
    };

    sendPostRequest();
  }, []);

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
          content: questionText,
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

  const bodyRef = useRef(null);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, questionLoding]);

  // 드롭다운 메뉴
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    editChat();
    setIsModalOpen(false);
  };

  const editChat = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/chat/${responseData}`,
        {
          title: isEditTitle,
        }
      );
      alert("채팅 제목이 수정되었습니다.");
    } catch (err) {
      console.log(err);
    } finally {
      setQuestionLoding(false);
    }
  };

  const deleteChat = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/chat/${responseData}`
      );
      alert("채팅이 삭제되었습니다.");
      navigate("/home");
    } catch (err) {
      console.log(err);
    } finally {
      setQuestionLoding(false);
    }
  };

  const items = [
    {
      key: "1",
      label: "제목 수정",
    },
    {
      key: "2",
      label: "채팅 삭제",
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      // 제목 수정 로직 추가
    } else if (e.key === "2") {
      deleteChat();
    }
  };

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate("/home")} />
        <HeaderTitle>{data.title}</HeaderTitle>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          trigger={["click"]}
        >
          <MenuButton onClick={(e) => e.preventDefault()}>
            <MenuOutlined style={{ fontSize: "26px" }} />
          </MenuButton>
        </Dropdown>
      </Header>
      <Body $height={bodyHeight} ref={bodyRef}>
        <LeftSpeechBubble>
          <MoyakImg />
          <TextBox>
            {data.map((list, index) => (
              <PillImgBox key={index}>
                <PillImg src={list.image} alt="testImg" />
                <PillName>
                  {list.pillName}
                  <PillIngredient>{list.pillIngredient}</PillIngredient>
                </PillName>
              </PillImgBox>
            ))}
            사진에서 발견한 알약들의 이름과 성분입니다. 더 필요한 정보가 있다면
            질문해주세요.
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                QuestionRequest();
              }
            }}
          />
        </InputContainer>
        <SendBox onClick={QuestionRequest} $disable={questionLoding}>
          <SendImg />
        </SendBox>
      </Bottom>

      <Modal
        title="제목 수정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <InputBox
          type="text"
          placeholder="수정할 제목을 입력하세요"
          value={isEditTitle}
          onChange={(e) => {
            setIsEditTitle(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};

export default ChatRoom;
