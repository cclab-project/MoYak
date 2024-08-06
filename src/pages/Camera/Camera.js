// CameraComponent.js
import React, { useRef, useState, useEffect } from 'react';
import {
    CameraContainer,
    VideoWrapper,
    VideoElement,
    GridOverlay,
    VerticalLine,
    HorizontalLine
} from './style';

const CameraComponent = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    useEffect(() => {
        const initCamera = async () => {
            if (isCameraOn) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: { exact: 'environment' } }
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error("Error accessing camera:", error);
                }
            } else {
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = (videoRef.current.srcObject).getTracks();
                    tracks.forEach((track) => track.stop());
                    videoRef.current.srcObject = null;
                }
            }
        };

        initCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [isCameraOn]);

    const toggleCamera = () => {
        setIsCameraOn((prevState) => !prevState);
    };

    return (
        <CameraContainer>
            <button onClick={toggleCamera}>{isCameraOn ? "Turn Off Camera" : "Turn On Camera"}</button>
            <VideoWrapper>
                <VideoElement ref={videoRef} autoPlay playsInline />
                <GridOverlay>
                    <VerticalLine />
                    <VerticalLine />
                    <HorizontalLine />
                    <HorizontalLine />
                </GridOverlay>
            </VideoWrapper>
        </CameraContainer>
    );
};

export default CameraComponent;