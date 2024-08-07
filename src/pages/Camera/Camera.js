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
                    setIsCameraOn(true);  // 카메라가 성공적으로 켜졌음을 표시
                }
            } catch (error) {
                if (error.name === 'OverconstrainedError') {
                    console.warn("Environment camera not available, switching to default camera.");
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            setIsCameraOn(true);
                        }
                    } catch (error) {
                        console.error("Error accessing camera:", error);
                    }
                } else {
                    console.error("Error accessing camera:", error);
                }
            }
        };

        initCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject).getTracks();
                tracks.forEach((track) => track.stop());
                videoRef.current.srcObject = null;
                setIsCameraOn(false);  // 카메라가 꺼졌음을 표시
            }
        };
    }, []);  // 빈 의존성 배열을 사용하여 페이지가 로드될 때 한 번만 실행

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
