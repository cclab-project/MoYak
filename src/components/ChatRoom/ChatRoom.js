import React from 'react';
import {
    ChatContainer,
    ImgBox,
    DataBox,
    Title,
    IngredientBox,
    IngredientItem,
    Date,
} from './style';
import testImg from '../../assets/testImg.png';

const ChatRoom = ({ item }) => {
    return (
        <ChatContainer>
            <ImgBox src={testImg} alt="pillImg"/>
            <DataBox>
                <Title>
                    {item.title}
                </Title>
                <IngredientBox>
                    {item.ingredient.map((ingredientData, index) => (
                        <IngredientItem>
                            {ingredientData}
                        </IngredientItem>
                    ))}
                </IngredientBox>
            </DataBox>
        </ChatContainer>
    );
};

export default ChatRoom;