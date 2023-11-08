import React from "react";
import MessagePageWrap from "../components/common/MessagePageWrap";

import "../styles/messagePage.scss";

interface Props {}

function MessageListPage(props: Props) {
  const {} = props;

  return (
    <MessagePageWrap>
      <div className="messageList wrap">
        <div className="item">
          <p>보낸사람 닉네임</p>
          <p className="read">읽음</p>
        </div>
        <div className="item">
          <p>보낸사람 닉네임</p>
          <p className="read">읽음</p>
        </div>
        <div className="item">
          <p>보낸사람 닉네임</p>
          <p className="read">읽음</p>
        </div>
        <div className="item">
          <p>보낸사람 닉네임</p>
          <p className="read">읽음</p>
        </div>
        <div className="item">
          <p>보낸사람 닉네임</p>
          <p className="read">읽음</p>
        </div>
        <div className="item">
          <p>보낸사람 닉네임</p>
          <p className="read">읽음</p>
        </div>
      </div>
    </MessagePageWrap>
  );
}

export default MessageListPage;
