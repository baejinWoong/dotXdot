import React from "react";
import "../../styles/components/login.scss";
import { Kakao } from "../../images/svg";
import { snsSignIn } from "../../api/login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accessTokenRecoil } from "../../recoil/atom";

declare global {
  interface Window {
    oathResultCallback?: (token: string) => void;
  }
}

/**
 *
 */
const KakaoButton = () => {
  const [, setAccessToken] = useRecoilState(accessTokenRecoil);
  const router = useNavigate();

  const kakaoLoginHandler = async () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`;
    window.open(
      kakaoAuthUrl,
      "kakao",
      "width=600, height=600, top=100, left=100"
    );
  };

  const signIn = (token: string) => {
    snsSignIn({
      accessToken: token,
    }).then((response) => {
      if (response.data.status.code === "E20003") {
        router(`/${response.data.data.name}`);
      } else if (response.data.status.code === "E30001") {
        setAccessToken(token);
        router("/signIn");
      } else if (response.data.status.code === "E40004") {
        alert("이미 가입된 회원 입니다");
      }
    });
  };

  React.useEffect(() => {
    window.oathResultCallback = (token) => {
      console.log("test");
      signIn(token);
    };
    return () => {
      window.oathResultCallback = undefined;
    };
  }, []);

  return (
    <button className="kakao" onClick={kakaoLoginHandler}>
      <div className="icon">
        <Kakao />
      </div>
      카카오 로그인
    </button>
  );
};

export default KakaoButton;

