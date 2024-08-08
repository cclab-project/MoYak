import styled from "styled-components";

import moyakLogo from '../../assets/moyakIcon.png';

export const LogoBox = styled.img.attrs({
    src: moyakLogo,
    alt: 'logo'
})`
    height: 300px;
`

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const JoinContainer = styled.div`
    margin-top: 200px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-evenly;
`

export const SNSIcon = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 15px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`
