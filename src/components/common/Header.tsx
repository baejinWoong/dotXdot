import React from "react";
import "../../styles/components/header.scss";
import Hamburger from "./Hamburger";

/**
 *
 */
const Header = () => {
  return (
    <div className="header wrap">
      <div className="doit wrap">
        <p>오늘 내가 색칠할 수 있는 횟수는</p>
        <div className="colorCount">
          <span>5</span>
          <span>/</span>
          <span>5</span>
        </div>
      </div>
      <Hamburger />
    </div>
  );
};

export default Header;

