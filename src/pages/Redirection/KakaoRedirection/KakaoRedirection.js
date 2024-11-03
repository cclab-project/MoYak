// hooks
import { useNavigate } from "react-router-dom";
import useAsync from "../../../hooks/useAsync/useAsync";

import Loading from "../../../components/Loading/Loading";
import { kakaoLoginReq } from "../../../utils/authAPIs/authAPIs";

const KakaoRedirection = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const KAKAO_CODE = url.searchParams.get("code");
  const [state] = useAsync(() => {
    return kakaoLoginReq(KAKAO_CODE);
  }, [KAKAO_CODE]);
  const { loading, data, error } = state;
  if (loading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    const userId = data.data.userId;
    localStorage.setItem("userId", userId);
    console.log("userId", userId);
    navigate("/home");
  }
};

export default KakaoRedirection;
