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

const ChatList = ({ item }) => {
  return (
    <ChatContainer>
      <ImgBox src={item.allImage} alt="pillImg" />
      <DataBox>
        <Title>{item.title}</Title>
        <IngredientBox>
          {item.pillName.map((pillName, index) => (
            <IngredientItem key={index}>{pillName}</IngredientItem>
          ))}
        </IngredientBox>
        <Date>{item.createDate}</Date>
      </DataBox>
    </ChatContainer>
  );
};

export default ChatList;
