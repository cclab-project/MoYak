import React from "react";
import {
  ChatContainer,
  ImgBox,
  DataBox,
  Title,
  IngredientBox,
  IngredientItem,
  Date,
} from "./style";
import testImg from "../../assets/testImg.png";

const ChatList = ({ item }) => {
  return (
    <ChatContainer>
      <ImgBox src={testImg} alt="pillImg" />
      <DataBox>
        <Title>{item.title}</Title>
        <IngredientBox>
          {item.pillName.map((pillName, index) => (
            <IngredientItem key={index}>{pillName}</IngredientItem>
          ))}
        </IngredientBox>
      </DataBox>
    </ChatContainer>
  );
};

export default ChatList;
