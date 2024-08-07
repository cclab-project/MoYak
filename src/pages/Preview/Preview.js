// PreviewPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageDataUrl } = location.state || {};

    if (!imageDataUrl) {
        navigate('/home');
        return null;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Preview</h1>
            <img src={imageDataUrl} alt="Captured" style={{ maxWidth: '100%' }} />
            <button onClick={() => navigate('/home')}>Go Home</button>
        </div>
    );
};

export default Preview;
