import styled from "styled-components";


export const BackgroundDef = styled.div`
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    border-radius: 0px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
`

export const BackgroundWithWhite = styled.div`
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    border-radius: 0px;
    overflow: hidden;
    background-color: white;
`