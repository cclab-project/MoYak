import styled from "styled-components";
import moyakLogo from "../../assets/Login/logo.png";
import plus from "../../assets/Home/plus.svg";

export const Header = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

export const Logo = styled.img.attrs({
  src: moyakLogo,
  alt: "logo",
})`
  margin-right: 5px;
  width: 30px;
`;

export const LogoName = styled.span`
  font-size: 20px;
  font-family: var(--font-anboRegular);
`;
export const Body = styled.div`
  width: calc(90% + 3px);
  margin: auto;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 6px;
`;

export const NewChat = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 90px;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PlusImg = styled.img.attrs({
  src: plus,
  alt: "plus",
})``;

export const Description = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;
