import React from "react";
import { CloseIcon, HamburgerIcon, SmallDotdotLogo } from "../../images/svg";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userNameRecoil } from "../../recoil/atom";

/**
 *
 */
const Hamburger = () => {
  const [signUserName, setSignUserName] = useRecoilState(userNameRecoil);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const router = useNavigate();

  const openHamburgerHandler = () => {
    setIsOpen(true);
  };

  const closeHamburgerHandler = () => {
    setIsOpen(false);
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.replace("/login");
  };

  return (
    <>
      <button onClick={openHamburgerHandler}>
        <HamburgerIcon />
      </button>
      <div className={`hamburger wrap${isOpen ? " active" : ""}`}>
        <div className="title">
          <SmallDotdotLogo />
          <button onClick={closeHamburgerHandler}>
            <CloseIcon />
          </button>
        </div>
        <div className="linkWrap">
          <p
            onClick={() => {
              router(`/${signUserName}`);
              closeHamburgerHandler();
            }}
          >
            마이페이지
          </p>
          <p
            onClick={() => {
              router(`/messages`);
              closeHamburgerHandler();
            }}
          >
            메세지 목록
          </p>
          <p>
            <a href={"https://dotxdot.notion.site/c955460a65654df6a2352d3127d6e574?pvs=4"}
               style={{textDecoration: 'none', color:'inherit'}}>
              닷닷돗돗노션
            </a>
          </p>
          <p className="disable" onClick={logoutHandler}>
            로그아웃
          </p>
        </div>
        <div className="infoWrap">
          <p>만든이 정보 : 김닷닷, 배돗돗, 이닷돗</p>
          <p>광고문의 : @email.com</p>
        </div>
        <p className="seasonWrap">@2023 dotxdot</p>
      </div>
      {isOpen && <div className={`hamburger dim${isOpen ? " active" : ""}`} />}
    </>
  );
};

export default Hamburger;
