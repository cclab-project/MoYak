import axios from 'axios';

export const kakaoLoginReq = async (code) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/kakao/callback?code=${code}`
    );

    return response;
};