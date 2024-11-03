import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  BrightnessControl,
} from "./style";

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [brightness, setBrightness] = useState(100); // 기본 밝기 100%
  const [focusPoint, setFocusPoint] = useState({ x: 0.5, y: 0.5 }); // 초점 위치 상태 추가

  useEffect(() => {
    const initCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: { exact: "environment" },
            focusMode: "continuous",
            advanced: [
              {
                focusMode: ["continuous", "manual"],
                focusDistance: { ideal: 0.5 },
              },
            ],
          },
        };

        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          // 트랙 설정을 위한 변수 저장
          const videoTrack = stream.getVideoTracks()[0];
          const capabilities = videoTrack.getCapabilities();

          // 초점 기능 지원 여부 확인
          if (capabilities.focusDistance || capabilities.focusMode) {
            console.log("초점 조절 기능이 지원됩니다.");
          }
        } catch (error) {
          console.warn(
            "후면 카메라를 찾을 수 없습니다. 전면 카메라로 전환합니다."
          );
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error("카메라 접근 에러:", error);
      }
    };

    if (isCameraOn) {
      initCamera();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const size = Math.min(video.videoWidth, video.videoHeight);

    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    context.filter = `brightness(${brightness}%)`;
    context.drawImage(
      video,
      (video.videoWidth - size) / 2,
      (video.videoHeight - size) / 2,
      size,
      size,
      0,
      0,
      size,
      size
    );

    const imageDataUrl = canvas.toDataURL("image/png");
    navigate("/preview", { state: { imageDataUrl, size } });
  };

  // 터치 이벤트 핸들러 추가
  const handleTouchFocus = async (e) => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    const videoTrack = videoRef.current.srcObject.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities();

    // 터치 위치 계산
    const rect = e.target.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width;
    const y = (e.touches[0].clientY - rect.top) / rect.height;

    setFocusPoint({ x, y });

    if (capabilities.focusMode?.includes("manual")) {
      try {
        await videoTrack.applyConstraints({
          advanced: [
            {
              focusMode: "manual",
              pointOfInterest: { x: x, y: y },
            },
          ],
        });
      } catch (error) {
        console.error("초점 설정 실패:", error);
      }
    }
  };

  return (
    <>
      <CameraContainer>
        <CameraWrapper>
          <StyledVideo
            ref={videoRef}
            autoPlay
            playsInline
            style={{ filter: `brightness(${brightness}%)` }}
            onTouchStart={handleTouchFocus}
          />
          <GridOverlay>
            <VerticalLine style={{ left: "33.33%" }} />
            <VerticalLine style={{ left: "66.66%" }} />
            <HorizontalLine style={{ top: "33.33%" }} />
            <HorizontalLine style={{ top: "66.66%" }} />
          </GridOverlay>
        </CameraWrapper>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <CaptureContainer>
          <CaptureBox>
            <OutButton />
            <InButton onClick={captureImage} />
          </CaptureBox>
        </CaptureContainer>
        <BrightnessControl>
          <label>Brightness</label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </BrightnessControl>
      </CameraContainer>
    </>
  );
};

export default CameraPage;
