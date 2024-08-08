import React from 'react';

import {
    MobileContainer,
    BodyContainer,
    Title
} from './style'

const Loading = () => {
    return (
        <MobileContainer>
            <BodyContainer>
                <Title>
                    로그인중입니다...
                </Title>
            </BodyContainer>
        </MobileContainer>
    );
};

export default Loading;