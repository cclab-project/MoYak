import React, { useRef, useState, useEffect } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    useEffect(() => {
        const initCamera = async () => {
            if (isCameraOn) {  // 카메라가 켜진 경우에만 스트림을 요청
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });  // 비디오 스트림 요청
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;  // 비디오 엘리먼트에 스트림 설정
                    }
                } catch (error) {
                    console.error("Error accessing camera:", error);  // 에러 처리
                }
            } else {
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = (videoRef.current.srcObject).getTracks();  // 스트림의 트랙을 가져옴
                    tracks.forEach((track) => track.stop());  // 각 트랙을 중지
                    videoRef.current.srcObject = null;  // 비디오 엘리먼트의 스트림 해제
                }
            }
        };

        initCamera();  // 카메라 초기화 함수 호출

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, [isCameraOn]);  // isCameraOn이 변경될 때마다 effect가 실행

    const toggleCamera = () => {
        setIsCameraOn((prevState) => !prevState);  // 카메라 상태 토글
    };

    return (
        <div>
            <button onClick={toggleCamera}>{isCameraOn ? "Turn Off Camera" : "Turn On Camera"}</button>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default CameraComponent;
