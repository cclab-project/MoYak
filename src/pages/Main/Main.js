import React from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    const cameraHandler = () => {
        navigate("/Camera");
    }
    return (
        <div>
            메인 홈 페이지
            <button onClick={cameraHandler}>
                카메라 이동
            </button>
        </div>
    );
};
 
export default Main;