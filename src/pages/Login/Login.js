import React from 'react';

//link
import { KAKAO_LINK } from '../../config/config';

import {
    LogoBox,
    LoginContainer,
} from './style';
const Login = () => {
    const kakaoLoginHandler = () => {
        window.location.href = KAKAO_LINK;
    };
    return (

        <LoginContainer>
            <LogoBox>

            </LogoBox>
            <button onClick={kakaoLoginHandler}>
                카카오 로그인
            </button>

        </LoginContainer>


    );
};

export default Login;