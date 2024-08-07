import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageDataUrl, size } = location.state || {};
    const [gridImages, setGridImages] = useState([]);

    useEffect(() => {
        if (!imageDataUrl) {
            navigate('/');
            return;
        }

        const createGridImages = () => {
            const img = new Image();
            img.src = imageDataUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const gridSize = size / 3;
                const images = [];

                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        canvas.width = gridSize;
                        canvas.height = gridSize;
                        context.clearRect(0, 0, gridSize, gridSize);
                        context.drawImage(img, col * gridSize, row * gridSize, gridSize, gridSize, 0, 0, gridSize, gridSize);
                        images.push(canvas.toDataURL('image/png'));
                    }
                }

                setGridImages(images);
            };
        };

        createGridImages();
    }, [imageDataUrl, navigate, size]);

    if (!imageDataUrl) {
        return null;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Preview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                {gridImages.map((src, index) => (
                    <img key={index} src={src} alt={`Grid ${index}`} style={{ width: '100%', height: 'auto' }} />
                ))}
            </div>
            <button onClick={() => navigate('/home')}>Go Home</button>
        </div>
    );
};

export default PreviewPage;
