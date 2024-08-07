import React, { useEffect, useRef, useState } from 'react';

const CameraPage = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(true);

    useEffect(() => {
        const initCamera = async () => {
            try {
                let stream;
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                let backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));

                const constraints = {
                    video: {
                        deviceId: backCamera ? { exact: backCamera.deviceId } : undefined
                    }
                };

                if (isCameraOn) {
                    stream = await navigator.mediaDevices.getUserMedia(constraints);
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } else {
                    if (videoRef.current && videoRef.current.srcObject) {
                        const tracks = videoRef.current.srcObject.getTracks();
                        tracks.forEach(track => track.stop());
                        videoRef.current.srcObject = null;
                    }
                }
            } catch (error) {
                console.error('카메라 접근 에러:', error);
            }
        };

        initCamera();

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
