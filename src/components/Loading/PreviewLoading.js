import React from 'react';
import styled from "styled-components";


const Modal = styled.div`
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Content = styled.div`
    font-size: 20px;
    color: white;
`


const PreviewLoading = () => {
    return (
        <Modal >
            <Content >
                알약을 분석중입니다...
            </Content>
        </Modal>
    );
};

export default PreviewLoading;