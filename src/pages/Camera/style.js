import styled from 'styled-components';
import outButton from '../../assets/Camera/OutButton.svg';
import inButton from '../../assets/Camera/InButton.svg';

export const CameraContainer = styled.div`
    position: relative;
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
`;

export const CameraWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    overflow: hidden;
`;

export const StyledVideo = styled.video`
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
`;

export const HorizontalLine = styled.div`
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
`;

export const CaptureContainer = styled.div`
    margin-top: 30px;
    user-select: none;
`;

export const CaptureBox = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
`;

export const OutButton = styled.img.attrs({
    src: outButton,
    alt: 'OutButton'
})`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const InButton = styled.img.attrs({
    src: inButton,
    alt: 'InButton'
})`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;  
    height: 64px; 
    transition: width 0.2s ease, height 0.2s ease;
  
    &:active {
      animation: shrink-grow 0.4s ease;
    }

    @keyframes shrink-grow {
        0% {
            width: 64px;
            height: 64px;
        }
        50% {
            width: 62px;  
            height: 62px; 
        }
        100% {
            width: 64px;
            height: 64px;
        }
    }
`;
