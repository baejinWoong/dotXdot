import React from "react";
import "../../styles/singlePage.scss";

/**
 *
 */
const SinglePageWrap = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`singleWrap${props.className ? ` ${props.className}` : ""}`}
    >
      {props.children}
    </div>
  );
};

export default SinglePageWrap;

