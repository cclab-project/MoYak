import styled from "styled-components";

import moyakLogo from '../../assets/Login/logo.png';

export const LogoBox = styled.div`
    margin-top: 15vh;
    display: flex;
    align-items: center;
`

export const Logo = styled.img.attrs({
    src: moyakLogo,
    alt: 'logo'
})`
    margin-right: 10px;
    width: 40px;
`

export const LogoName = styled.span`
    font-size: 36px;
    font-family: var(--font-anboRegular);
`

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const JoinContainer = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
`

export const Description = styled.div`
    margin-top: 40vh;
    margin-bottom: 15px;
    color: grey;
    font-size: 12px;
`

export const SNSIcon = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 15px;
    margin: 0 20px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`
