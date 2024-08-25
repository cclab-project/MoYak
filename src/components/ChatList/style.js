import styled from "styled-components";

export const ChatContainer = styled.div`
    width: 100%;
    height: 90px;
    background-color: #F9F9F9;
    border: 2px solid black;
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
`

export const ImgBox = styled.img`
    border-radius: 3px 0 0 3px;
`

export const DataBox = styled.div`
    //margin-left: 10px;
`

export const Title = styled.div`
    margin-top: 5px;
    margin-left: 10px;
    font-size: 18px;
`

export const IngredientBox = styled.div`
    display: flex; 
    width: 100%;
    flex-wrap: wrap;       
    max-height: 50px;      
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap;  
`

export const IngredientItem = styled.span`
    white-space: nowrap;
    margin: 2px 5px;
    padding: 1px 7px;
    font-size: 13px;
    border-radius: 6px ;
    line-height: 20px;
    background-color: #D9D9D9;
    font-family: var(--font-sansMedium);

`

export const Date = styled.div`

`