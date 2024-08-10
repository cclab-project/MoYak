import React, { useEffect, useState } from 'react';
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
                // 이미지를 90x90 크기로 조정
                const targetSize = 90;
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

    if (!imageDataUrl) {
        return null;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Preview</h1>
            {resizedImageDataUrl && (
                <div>
                    <h2>Resized Image</h2>
                    <img src={resizedImageDataUrl} alt="Resized" style={{ width: '90px', height: '90px' }} />
                </div>
            )}
            <h2>Grid Images</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                {gridImages.map((src, index) => (
                    <img key={index} src={src} alt={`Grid ${index}`} style={{ width: '100%', height: 'auto' }} />
                ))}
            </div>
            <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    );
};

export default PreviewPage;