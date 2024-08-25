import styled from "styled-components";

//img
import right from '../../assets/Chat/right.png'
import menu from '../../assets/Chat/menu.png' 

export const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`

export const BackButton = styled.img.attrs({
    src: right,
    alt: 'back'
})`
    margin-left: 5px;
    width: 40px;
    height: 40px;
`

export const HeaderTitle = styled.div`
    font-size: 20px;
`

export const MenuButton = styled.img.attrs({
    src: menu,
    alt: 'menu'
})`
    margin-right: 5px;
    width: 40px;
    height: 40px;
`