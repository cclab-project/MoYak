import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { detectPill } from '../../components/detectPill';

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageDataUrl } = location.state || {};
    const [gridImages, setGridImages] = useState([]);
    const [resizedImageDataUrl, setResizedImageDataUrl] = useState(null);

    useEffect(() => {
        if (!imageDataUrl) {
            navigate('/');
            return;
        }

        const resizeImage = (img, size) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = size;
            canvas.height = size;
            context.drawImage(img, 0, 0, size, size);
            return canvas.toDataURL('image/png');
        };

        const createGridImages = async () => {
            const img = new Image();
            img.src = imageDataUrl;
            img.onload = async () => {
                // 이미지를 250x250 크기로 조정
                const targetSize = 250;
                const resizedUrl = resizeImage(img, targetSize);
                setResizedImageDataUrl(resizedUrl);

                // 원본 이미지를 3x3 격자로 나누기
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const gridSize = img.width / 3;
                const images = [];

                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        canvas.width = gridSize;
                        canvas.height = gridSize;
                        context.clearRect(0, 0, gridSize, gridSize);
                        context.drawImage(
                            img,
                            col * gridSize,
                            row * gridSize,
                            gridSize,
                            gridSize,
                            0,
                            0,
                            gridSize,
                            gridSize
                        );

                        const imageElement = new Image();
                        imageElement.src = canvas.toDataURL('image/png');

                        const pillDetected = await new Promise((resolve) => {
                            imageElement.onload = async () => {
                                const result = await detectPill(imageElement);
                                resolve(result);
                            };
                        });

                        if (pillDetected) {
                            images.push(canvas.toDataURL('image/png'));
                        }
                    }
                }

                setGridImages(images);
            };
        };

        createGridImages();
    }, [imageDataUrl, navigate]);


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const sendPostRequest = async () => {
        setLoading(true);
        setError(null);
        try {
            //blob으로 변환 후 formData로 넣기
            const formData = new FormData();
            const blob = await fetch(resizedImageDataUrl).then(res => res.blob());
            formData.append('all_image', blob, 'all_image.png');

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setData(response.data); 
            console.log(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {/* <h1>Preview</h1>
            {resizedImageDataUrl && (
                <div>
                    <h2>Resized Image</h2>
                    <img src={resizedImageDataUrl} alt="Resized" style={{ width: '90px', height: '90px' }} />
                </div>
            )} */}
            <h2>알약을 {gridImages.length}개 발견하였습니다</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                {gridImages.map((src, index) => (
                    <img key={index} src={src} alt={`Grid ${index}`} style={{ width: '100%', height: 'auto' }} />
                ))}
            </div>
            <button onClick={sendPostRequest}>이 알약들로 질문할래요</button><br />
            <button onClick={() => navigate('/camera')}>사진 다시 찍기</button>
        </div>
    );
};

export default PreviewPage;