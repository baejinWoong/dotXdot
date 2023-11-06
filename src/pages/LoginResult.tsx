/* eslint-disable no-restricted-globals */
import React from "react";
import { kakaoGetTockenTest } from "../api/oath";

/**
 *
 */
const LoginResult = () => {
  React.useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    void kakaoGetTockenTest(code).then((response) => {
      window.opener.oathResultCallback(response.data.access_token);
      self.close();
    });
  }, []);
  return <div></div>;
};

export default LoginResult;

