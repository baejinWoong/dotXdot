import React from "react";
import MessagePageWrap from "../components/common/MessagePageWrap";

import "../styles/messagePage.scss";
import { getPaints } from "../api/main";

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
  return (
    <div className="item">
      <p>{data.name}</p>
      <p className={data.hasRead ? "read" : "noRead"}>
        {data.hasRead ? "읽음" : "왜 안읽어"}
      </p>
    </div>
  );
};

const MessageListPage = (props: Props) => {
  const {} = props;

  const [lastId, setLastId] = React.useState<number>(0);
  const [messages, setMessages] = React.useState<I_getPaintResult[]>([]);
  const [isNext, setIsNext] = React.useState<boolean>(true);
  const [isLoad, setIsLoad] = React.useState<boolean>(false);

  const getNextScrollData = () => {
    if (isNext)
      void getPaints({
        pageSize: 20,
        lastId,
      }).then((res) => {
        if (res.data?.status.code === "E20000") {
          const lastIndex = (res.data.data as I_getPaintResult[]).length;
          setMessages((prev) => prev.concat(res.data.data));
          setLastId(
            (res.data.data as I_getPaintResult[])[lastIndex - 1].pixelId
          );
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
    setIsLoad((prev) => {
      if (scrollP > 80 && prev === false) {
        getNextScrollData();
      }
      return true;
    });
  };

  React.useEffect(() => {
    void getPaints({
      pageSize: 20,
    }).then((res) => {
      if (res.data?.status.code === "E20000") {
        const lastIndex = (res.data.data as I_getPaintResult[]).length;
        setMessages(res.data.data);
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
