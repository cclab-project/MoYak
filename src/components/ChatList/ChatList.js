import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const chatHandler = (chatId) => {
    console.log(chatId);
    navigate("/chatroom", {
      state: { responseData: chatId },
    });
  };
  return (
    <ChatContainer onClick={() => chatHandler(item.chat_id)}>
      <ImgBox src={item.allImage} alt="pillImg" />
      <DataBox>
        <Title>
          <div>{item.title}</div>
          <Date>{item.createdAt}</Date>
        </Title>
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
