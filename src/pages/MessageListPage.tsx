import React from "react";
import ReactDOM from "react-dom";
import MessagePageWrap from "../components/common/MessagePageWrap";

import "../styles/messagePage.scss";
import "../styles/mainPage.scss";
import { getPaints } from "../api/main";
import { CloseIcon } from "../images/svg";
import { useRecoilState } from "recoil";
import { getMessageCntRecoli } from "../recoil/atom";

interface Props {}

interface I_Item {
  data: {
    contents: string;
    hasRead: boolean;
    name: string;
    pixelId: number;
  };
}

interface I_getPaintResult {
  contents: string;
  hasRead: boolean;
  name: string;
  pixelId: number;
}

const Item = (props: I_Item) => {
  const { data } = props;

  const [isContent, setIsContent] = React.useState<boolean>(false);

  const openContentsHandler = () => {
    setIsContent(true);
  };

  const closeAllHandler = () => {
    setIsContent(false);
  };

  return (
    <>
      <div className="item" onClick={openContentsHandler}>
        <p>{data.name}</p>
        <p className={data.hasRead ? "read" : "noRead"}>
          {data.hasRead ? "읽음" : "읽지 않음"}
        </p>
      </div>

      <Modal open={isContent}>
        <div className="exit">
          <div className="iconWrap" onClick={closeAllHandler}>
            <CloseIcon />
          </div>
        </div>
        <div className="contentPopupCard message">
          <p>내가 받은 11.11데이 메세지</p>
          <div className="inputBox">
            <div className="inputWrap">
              <p className="text">
                <span>From.</span>
                {data.name}
              </p>
            </div>
          </div>
          <textarea value={data.contents} readOnly />
        </div>
      </Modal>
    </>
  );
};

const MessageListPage = (props: Props) => {
  const [, setGetMessageCnt] = useRecoilState(getMessageCntRecoli);

  const [lastId, setLastId] = React.useState<number>(0);
  const [messages, setMessages] = React.useState<I_getPaintResult[]>([]);
  const [isNext, setIsNext] = React.useState<boolean>(true);
  const [isLoad, setIsLoad] = React.useState<boolean>(false);

  const getNextScrollData = () => {
    setIsLoad(true);
    void getPaints({
      pageSize: 8,
      lastId,
    }).then((res) => {
      if (res.data?.status.code === "E20000") {
        const lastIndex = (res.data.data as I_getPaintResult[]).length;
        setMessages((prev) => prev.concat(res.data.data));
        setLastId((res.data.data as I_getPaintResult[])[lastIndex - 1].pixelId);
        setIsLoad(false);
      }

      if (res.data?.status.code === "E20002") {
        setIsNext(false);
        setIsLoad(false);
      }
    });
  };

  const scrollEventHandler = async (
    e: React.UIEvent<HTMLDivElement, UIEvent>
  ) => {
    const target = e.currentTarget;
    const movePoint = target.scrollTop;
    const moveHeight = target.scrollHeight - target.offsetHeight;
    const scrollP = (movePoint / moveHeight) * 100;
    if (scrollP > 80 && !isLoad && isNext) {
      getNextScrollData();
    }
  };

  React.useEffect(() => {
    void getPaints({
      pageSize: 8,
    }).then((res) => {
      if (res.data?.status.code === "E20000") {
        const lastIndex = (res.data.data as I_getPaintResult[]).length;
        setMessages(res.data.data);
        setGetMessageCnt(lastIndex);
        setLastId((res.data.data as I_getPaintResult[])[lastIndex - 1].pixelId);
      }
    });
  }, []);

  return (
    <MessagePageWrap>
      <div className="messageList wrap" onScroll={scrollEventHandler}>
        {messages.map((data, idx) => (
          <Item data={data} key={`messageItem_${idx}`} />
        ))}
      </div>
    </MessagePageWrap>
  );
};

export default MessageListPage;

interface I_modalProps {
  open: boolean;
  children?: React.ReactNode;
}

/**
 * @param open isOpen Modal boolean, Default: false
 */
const Modal = ({ open, children }: I_modalProps) => {
  React.useEffect(() => {
    const isAnotherModal =
      document.getElementsByClassName("modalWrap").length > 0;
    const isHeader = document.body.getElementsByTagName("header").length > 0;
    const isScroll = document.body.offsetHeight > window.innerHeight;
    if (open) {
      document.body.style.overflow = "hidden";
      if (isHeader && isScroll) {
        document.body.style.paddingRight = "15px";
        // document.body.getElementsByTagName('header')[0].style.paddingRight = '55px'
      }
    } else if (!isAnotherModal) {
      document.body.style.removeProperty("overflow");
      if (isHeader && isScroll) {
        document.body.style.removeProperty("padding-right");
        document.body
          .getElementsByTagName("header")[0]
          .style.removeProperty("padding-right");
      }
    }
  }, [open]);

  if (open) {
    const el = document.body;
    return ReactDOM.createPortal(
      <div
        className="colorPickerWrap"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
        <div className="dim" />
      </div>,
      el
    );
  } else return null;
};
