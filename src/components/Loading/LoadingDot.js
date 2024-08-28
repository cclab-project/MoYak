import React from 'react';
import styled, { keyframes } from 'styled-components';

// 점이 깜빡이는 애니메이션을 정의합니다.
const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoadingDotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }

  &:nth-child(3) {
    animation-delay: 0s;
  }
`;

const LoadingDots = () => (
    <LoadingDotsContainer>
        <Dot />
        <Dot />
        <Dot />
    </LoadingDotsContainer>
);

export default LoadingDots;