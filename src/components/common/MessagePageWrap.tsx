import React from "react";
import MessageHeader from "./MessageHeader";

/**
 *
 */
const MessagePageWrap = (props: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`mainWrap${props.className ? ` ${props.className}` : ""}`}>
      <MessageHeader />
      <div className="body">{props.children}</div>
    </div>
  );
};

export default MessagePageWrap;
