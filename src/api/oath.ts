import http from "./oathHttp";

export const kakaoGetTockenTest = async (data: string | null) => {
  const url = "https://kauth.kakao.com/oauth/token";
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append(
    "client_id",
    process.env.REACT_APP_KAKAO_KEY != null
      ? process.env.REACT_APP_KAKAO_KEY
      : ""
  );
  params.append(
    "redirect_uri",
    process.env.REACT_APP_KAKAO_REDIRECT_URL != null
      ? process.env.REACT_APP_KAKAO_REDIRECT_URL
      : ""
  );
  params.append("code", data != null ? data : "");

  return await http.post(url, params);
};

