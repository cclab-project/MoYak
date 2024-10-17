import React from "react";
import { useNavigate } from "react-router-dom";

//link
import { KAKAO_LINK } from "../../config/config";

//img
import kakao from "../../assets/Login/kakao.png";
import google from "../../assets/Login/google.png";

import {
  LogoBox,
  Logo,
  LogoName,
  LoginContainer,
  JoinContainer,
  Description,
  SNSIcon,
} from "./style";
const Login = () => {
  const navigate = useNavigate();
  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_LINK;
  };
  return (
    <LoginContainer>
      <LogoBox>
        <Logo />
        <LogoName>이게모약</LogoName>
      </LogoBox>
      <Description>간편 소셜로그인</Description>
      <JoinContainer>
        <SNSIcon src={kakao} alt="kakao" onClick={kakaoLoginHandler} />
        <SNSIcon
          src={google}
          alt="google"
          onClick={() => navigate("/chatroom")}
        />
      </JoinContainer>
    </LoginContainer>
  );
};

export default Login;
