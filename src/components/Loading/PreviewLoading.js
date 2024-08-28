import React from 'react';
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

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
    animation: ${props => props.$show ? fadeIn : fadeOut} 0.3s forwards;
`

const Content = styled.div`
    font-size: 20px;
    color: white;
`


const PreviewLoading = ({ show }) => {
    return (
        <Modal $show={show}>
            <Content >
                알약을 분석중입니다...
            </Content>
        </Modal>
    );
};

export default PreviewLoading;