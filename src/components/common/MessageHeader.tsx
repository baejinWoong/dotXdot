import React from "react";
import { useRecoilState } from "recoil";
import { remainCntRecoil, userNameRecoil } from "../../recoil/atom";
import { snsSignIn } from "../../api/login";
import Hamburger from "./Hamburger";

interface Props {}

function MessageHeader(props: Props) {
  const [remainCnt, setRemainCnt] = useRecoilState(remainCntRecoil);
  const [signUserName, setSignUserName] = useRecoilState(userNameRecoil);

  if (window.localStorage.getItem("oathToken")) {
    const token = window.localStorage.getItem("oathToken") as string;
    snsSignIn({
      accessToken: token,
    }).then((response) => {
      if (response.data.status.code === "E20003") {
        setRemainCnt(Number(response.data.data.remainCnt));
        setSignUserName(response.data.data.name);
      }
    });
  }

  return (
    <div className="header wrap">
      <div className="dot wrap">
        <p>{signUserName} 님이 받은 메세지는</p>
        <div className="colorCount">
          <span>{remainCnt}</span>
        </div>
      </div>
      <Hamburger />
    </div>
  );
}

export default MessageHeader;
