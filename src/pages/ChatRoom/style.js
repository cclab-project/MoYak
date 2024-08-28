import styled from "styled-components";

//img
import right from '../../assets/Chat/right.png'
import menu from '../../assets/Chat/menu.png' 
import send from '../../assets/Chat/send.png'

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
`;

export const Header = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 45px;
    position: fixed;
    top: 0;
    justify-content: space-between;
    align-items: center;
    padding-top: 3px;
    padding-bottom: 3px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
    z-index: 100;
`

export const BackButton = styled.img.attrs({
    src: right,
    alt: 'back'
})`
    transform: rotate(90deg);
    margin-bottom: 5px;
    width: 36px;
    height: 36px;
`

export const HeaderTitle = styled.div`
    font-size: 18px;
`

export const MenuButton = styled.img.attrs({
    src: menu,
    alt: 'menu'
})`
    margin-right: 5px;
    width: 36px;
    height: 36px;
`

export const Body = styled.div` 
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    margin-top: 50px; 
    margin-bottom: 50px; 
    height: ${props => props.$height}px; 

`

export const Bottom = styled.div`
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #D9D9D9;
    display: flex;
`

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 32px);
`

export const InputBox = styled.input`
    width: 100%;
    margin: 6px;

`

export const SendBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: 6px;
    background-color: white;
    border-radius: 5px;
`

export const SendImg = styled.img.attrs({
    src: send,
    alt: 'send'
})`
    width: 20px;
    height: 20px;
`