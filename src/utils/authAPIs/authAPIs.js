import axios from 'axios';

export const kakaoLoginReq = async (code) => {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login/oauth2/code/kakao?code=${code}`
    );

    return response;
};