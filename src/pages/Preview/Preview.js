import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { detectPill } from '../../components/detectPill';

//modat
import ModalPortal from '../../modal/ModalPortal';
import PreviewLoading from '../../components/Loading/PreviewLoading';

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
    const sendPostRequest = async () => {
        setLoading(true);
        try {
            const formData_all = new FormData();
            const blob = await fetch(resizedImageDataUrl).then(res => res.blob());
            formData_all.append('all_image', blob, 'all_image.png');

            // 첫 번째 요청
            const response_all = await axios.post(`${process.env.REACT_APP_SERVER_URL}/chat/create`, formData_all, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const chat_id = response_all.data;

            const formData_each = new FormData();
            for (let i = 0; i < gridImages.length; i++) {
                const blob = await fetch(gridImages[i]).then(res => res.blob());
                formData_each.append(`image${i}`, blob, `image${i}.png`);
            }
            formData_each.append('chat_id', chat_id);

            // 두 번째 요청
            const response_each = await axios.post(`${process.env.REACT_APP_PYTHON_URL}/predict`, formData_each, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/chatroom", { state: { responseData: response_each.data } });

        } catch (err) {
            console.log(err);
            alert("다시 시도해주세요")
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
            {loading && (
                <ModalPortal>
                    <PreviewLoading show={loading}/>
                </ModalPortal>
            )}
        </div>
    );
};

export default PreviewPage;