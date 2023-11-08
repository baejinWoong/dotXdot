import React from "react";
import "../../styles/components/header.scss";
import Hamburger from "./Hamburger";
import { useRecoilState } from "recoil";
import { remainCntRecoil } from "../../recoil/atom";
import { snsSignIn } from "../../api/login";

/**
 *
 */
const Header = () => {
  const [remainCnt, setRemainCnt] = useRecoilState(remainCntRecoil);

  if (window.localStorage.getItem("oathToken")) {
    const token = window.localStorage.getItem("oathToken") as string;
    snsSignIn({
      accessToken: token,
    }).then((response) => {
      if (response.data.status.code === "E20003") {
        setRemainCnt(Number(response.data.data.remainCnt));
      }
    });
  }

  return (
    <div className="header wrap">
      <div className="dot wrap">
        <p>오늘 내가 색칠할 수 있는 횟수는</p>
        <div className="colorCount">
          <span>{remainCnt}</span>
          <span>/</span>
          <span>5</span>
        </div>
      </div>
      <Hamburger />
    </div>
  );
};

export default Header;
