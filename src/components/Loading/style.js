import styled from 'styled-components';

export const MobileContainer = styled.div`
    width: 380px;
    height: 740px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    @media(max-width: 600px) {
        width: 100vw;
        height: calc(var(--vh, 1vh) * 100);
        border-radius: 0px;
        overflow: hidden;
    }
`

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 250px;
`

export const Title = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
`