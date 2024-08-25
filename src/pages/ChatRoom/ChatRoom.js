import React from 'react';

import {
    Header,
    BackButton,
    MenuButton,
    HeaderTitle,
} from './style';

const ChatRoom = () => {
    return (
        <>
            <Header>
                <BackButton />
                <HeaderTitle>
                    제목목
                </HeaderTitle>
                <MenuButton />
            </Header>
            
        </>
    );
};

export default ChatRoom;