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
`