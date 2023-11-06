import React from "react";
import Header from "./Header";

/**
 *
 */
const MainPageWrap = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`mainWrap${props.className ? ` ${props.className}` : ""}`}>
      <Header />
      <div className="body">{props.children}</div>
    </div>
  );
};

export default MainPageWrap;

