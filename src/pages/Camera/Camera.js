import React, { useRef, useState, useEffect } from 'react';
import './CameraComponent.css'; // CSS 파일을 가져옵니다.

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
        <div className="camera-container">
            <button onClick={toggleCamera}>{isCameraOn ? "Turn Off Camera" : "Turn On Camera"}</button>
            <div className="video-wrapper">
                <video ref={videoRef} autoPlay playsInline className="video-element" />
                <div className="grid-overlay">
                    <div className="vertical-line line-1"></div>
                    <div className="vertical-line line-2"></div>
                    <div className="horizontal-line line-1"></div>
                    <div className="horizontal-line line-2"></div>
                </div>
            </div>
        </div>
    );
};

export default CameraComponent;