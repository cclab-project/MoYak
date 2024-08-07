// style.js
import styled from 'styled-components';

export const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  padding-top: 100%;
`;

export const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GridOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const VerticalLine = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); 
  display: ${(props) => (props.isCameraOn ? 'block' : 'none')};

  &:nth-child(1) {
    left: 33.33%;
  }

  &:nth-child(2) {
    left: 66.66%;
  }
`;

export const HorizontalLine = styled.div`
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5); 
  display: ${(props) => (props.isCameraOn ? 'block' : 'none')};

  &:nth-child(3) {
    top: 33.33%;
  }

  &:nth-child(4) {
    top: 66.66%;
  }
`;
