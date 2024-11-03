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

  useEffect(() => {
    const initCamera = async () => {
      try {
        const constraints = {
          video: { facingMode: { exact: "environment" } },
        };

        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
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

  // 초점 조절 핸들러
  const handleTouchFocus = (event) => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const rect = video.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // 비디오의 크기와 터치 좌표를 바탕으로 초점 좌표 계산
    const focusX = (x / rect.width) * video.videoWidth;
    const focusY = (y / rect.height) * video.videoHeight;

    // 카메라의 초점 영역을 설정 (모바일 장치에서 지원할 경우)
    const track = video.srcObject.getVideoTracks()[0];
    const capabilities = track.getCapabilities();
    if (capabilities.focusMode) {
      const settings = track.getSettings();
      const constraints = {
        advanced: [
          {
            focusMode: "manual",
            focusPointX: focusX,
            focusPointY: focusY,
          },
        ],
      };
      track.applyConstraints(constraints).catch((error) => {
        console.error("초점 설정 중 오류 발생:", error);
      });
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
            onTouchStart={handleTouchFocus} // 터치로 초점 조절 기능 추가
            style={{ filter: `brightness(${brightness}%)` }}
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
