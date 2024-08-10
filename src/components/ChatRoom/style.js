import styled from "styled-components";

export const ChatContainer = styled.div`
    width: 100%;
    height: 90px;
    background-color: lightblue;
    border: 2px solid black;
    border-radius: 5px;
    margin-top: 10px;
    display: flex;
`

export const ImgBox = styled.img`
    border-radius: 3px;
`

export const DataBox = styled.div`
    margin-left: 10px;
`

export const Title = styled.div`
    margin-top: 5px;
`

export const IngredientBox = styled.div`
    display: flex; 
    width: 100%;
    flex-wrap: wrap;       
    max-height: 40px;      
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap;   
`

export const IngredientItem = styled.div`
    font-size: 14px;
    margin: 0 5px;
`

export const Date = styled.div`

`