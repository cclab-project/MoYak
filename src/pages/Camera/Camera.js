import React, { useEffect, useRef, useState } from 'react';

const CameraPage = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(true);

    useEffect(() => {
        const initCamera = async () => {
            try {
                let stream;
                const constraints = {
                    video: {
                        facingMode: { exact: 'environment' }
                    }
                };

                try {
                    stream = await navigator.mediaDevices.getUserMedia(constraints);
                } catch (error) {
                    // If facingMode exact environment is not found, fall back to the default camera
                    console.warn('후면 카메라를 찾을 수 없습니다. 전면 카메라로 전환합니다.');
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                }

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
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

    return (
        <div>
            <h1>카메라 페이지</h1>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default CameraPage;
