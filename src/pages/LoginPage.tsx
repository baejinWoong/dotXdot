import React from "react";
import SinglePageWrap from "../components/common/SinglePageWrap";
import KakaoButton from "../components/login/KakaoButton";
import { DotdotLogo } from "../images/svg";

/**
 *
 */
const LoginPage = () => {
  return (
    <SinglePageWrap className="loginWrap">
      <DotdotLogo />
      <KakaoButton />
    </SinglePageWrap>
  );
};

export default LoginPage;

