import React from 'react';
import { useLocation } from 'react-router-dom';

import {
    Header,
    BackButton,
    MenuButton,
    HeaderTitle,
} from './style';

const ChatRoom = () => {
    const location = useLocation();
    const { responseData } = location.state || {};
    const chatex = [
        {
            sender: '1',
            content: '이 약들을 한번에 먹어도 되나요?',
        },
        {
            sender: '0',
            content: '위약을 먹기 전에 의사와 상의하시는 것이 좋습니다. 그러나 이 약물들 간에는 중요한 상호작용이 있을 수 있으며, 함께 복용할 때 발생할 수 있는 부작용이 있을 수 있습니다. 특히, Tramadol과 Acetaminophen은 중추신경계에 영향을 미칠 수 있으므로 주의가 필요합니다. 가능하다면 각 약물의 전문가나 의사와 상담하여 복용 가능 여부를 확인하시는 것이 좋습니다.',
        },
        {
            sender: '1',
            content: '이 약들을 먹고 술을 마셔도 돼?',
        },
    ]
    return (
        <>
            <Header>
                <BackButton />
                <HeaderTitle>
                    채팅방 번호: {responseData}
                </HeaderTitle>
                <MenuButton />
            </Header>
            
        </>
    );
};

export default ChatRoom;