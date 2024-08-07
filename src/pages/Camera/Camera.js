import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CameraContainer,
    CameraWrapper,
    StyledVideo,
    GridOverlay,
    VerticalLine,
    HorizontalLine,
    CaptureContainer,
    OutButton,
    InButton,
    CaptureBox,

} from './style';

const CameraPage = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const initCamera = async () => {
            try {
                const constraints = {
                    video: { facingMode: { exact: 'environment' } }
                };

                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.warn('후면 카메라를 찾을 수 없습니다. 전면 카메라로 전환합니다.');
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                }
            } catch (error) {
                console.error('카메라 접근 에러:', error);
            }
        };

        if (isCameraOn) {
            initCamera();
        }

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [isCameraOn]);

    const captureImage = () => {
        if (!canvasRef.current || !videoRef.current) return;
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        navigate('/Preview', { state: { imageDataUrl } });
    };

    return (
        <>
            <CameraContainer>
                <CameraWrapper>
                    <StyledVideo ref={videoRef} autoPlay playsInline />
                    <GridOverlay>
                        <VerticalLine />
                        <VerticalLine />
                        <HorizontalLine />
                        <HorizontalLine />
                    </GridOverlay>
                </CameraWrapper>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <CaptureContainer>
                    <CaptureBox>
                        <OutButton />
                        <InButton onClick={captureImage}/>
                    </CaptureBox>
                </CaptureContainer>
            </CameraContainer>
            
        </>
    );
};

export default CameraPage;
