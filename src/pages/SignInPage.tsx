import React from "react";
import SinglePageWrap from "../components/common/SinglePageWrap";
import "../styles/components/signIn.scss";
import { useRecoilState } from "recoil";
import {
  accessTokenRecoil,
  alertModalRecoil,
  userNameRecoil,
} from "../recoil/atom";
import { snsSignIn } from "../api/login";
import { useNavigate } from "react-router-dom";

/**
 *
 */
const SignInPage = () => {
  const [signUserName, setSignUserName] = useRecoilState(userNameRecoil);
  const [errorText, setErrorText] = React.useState<string>();
  const [accessToken] = useRecoilState(accessTokenRecoil);
  const [, setAlertState] = useRecoilState(alertModalRecoil);

  const router = useNavigate();

  const changeUserNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    if (value.length < 11) {
      setSignUserName(value);
    }
  };

  const postSignInhandler = () => {
    if (signUserName) {
      void snsSignIn({
        accessToken,
        name: signUserName,
      }).then((response) => {
        if (response.data?.status.code === "E20003") {
          setAlertState({
            isOpen: true,
            alertText: "가입완료 되었습니다!",
            clickButtonCallback: () => {
              router(`/${signUserName}`);
            },
          });
        }
      });
    } else {
      setErrorText("사용할 닉네임을 입력해주세요.");
    }
  };

  React.useEffect(() => {
    if (!accessToken) {
      setAlertState({
        isOpen: true,
        alertText:
          "페이지가 새로고침 되었거나, 카카오 로그인 하지않은 상태입니다!\n카카오 회원가입후 이용 부탁드립니다.",
        clickButtonCallback: () => {
          router("/login");
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SinglePageWrap className="signIn wrap">
      <div className="signInInfo">
        <p className="title">닉네임을 입력해 주세요</p>
        <div className="inputBox">
          <div className="inputWrap">
            <input
              value={signUserName}
              onChange={changeUserNameHandler}
              placeholder="사용할 닉네임 입력"
            />
            <span className="delete">삭제</span>
          </div>
          <p className="errorText">{errorText}</p>
        </div>
      </div>
      <div className="signInBottom">
        <p>
          <span>개인정보 처리방침</span> 약관 동의
        </p>
        <button className="signin" onClick={postSignInhandler}>
          가입하기
        </button>
      </div>
    </SinglePageWrap>
  );
};

export default SignInPage;
