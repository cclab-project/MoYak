// CameraPage.js
import React, { useRef, useState, useEffect } from 'react';
import {
    CameraContainer,
    VideoWrapper,
    VideoElement,
    GridOverlay,
    VerticalLine,
    HorizontalLine
} from './style';

const CameraPage = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { exact: 'environment' } }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsCameraOn(true);  
                }
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

        initCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject).getTracks();
                tracks.forEach((track) => track.stop());
                videoRef.current.srcObject = null;
                setIsCameraOn(false);  
            }
        };
    }, []);  

    return (
        <CameraContainer>
            <VideoWrapper>
                <VideoElement ref={videoRef} autoPlay playsInline />
                <GridOverlay>
                    <VerticalLine isCameraOn={isCameraOn} />
                    <VerticalLine isCameraOn={isCameraOn} />
                    <HorizontalLine isCameraOn={isCameraOn} />
                    <HorizontalLine isCameraOn={isCameraOn} />
                </GridOverlay>
            </VideoWrapper>
        </CameraContainer>
    );
};

export default CameraPage;
