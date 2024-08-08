import React from 'react';

//link
import { KAKAO_LINK } from '../../config/config';

//img
import kakao from '../../assets/Login/kakao.png'
import google from '../../assets/Login/google.png'

import {
    LogoBox,
    LoginContainer,
    JoinContainer,
    SNSIcon,
} from './style';
const Login = () => {
    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_LINK;
    };
    return (

        <LoginContainer>
            <LogoBox>

            </LogoBox>
            <JoinContainer>
                <SNSIcon
                    src={kakao}
                    alt='kakao'
                    onClick={kakaoLoginHandler}
                />
                <SNSIcon src={google} alt='google' />
            </JoinContainer>

        </LoginContainer>


    );
};

export default Login;