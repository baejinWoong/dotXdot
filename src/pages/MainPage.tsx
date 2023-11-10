import React from "react";
import ReactDOM from "react-dom";
import MainPageWrap from "../components/common/MainPageWrap";
import { ChromePicker, ColorResult, RGBColor } from "react-color";
import "../styles/mainPage.scss";
import styled from "styled-components";
import { CloseIcon, DubleOneIcon, Kakao, LinkIcon } from "../images/svg";
import { useRecoilState } from "recoil";
import { alertModalRecoil, remainCntRecoil } from "../recoil/atom";
import { getPaint, memberInfo, postPaint } from "../api/main";
import { useParams } from "react-router-dom";

const xList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const yList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

interface x_content {
  targetMemberSeq: number;
  yData: number;
  xData: number;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  isMine: boolean;
  isData: boolean;
  pixelId?: number;
  reloadCallback: () => void;
}

const XcontentComponent = styled.div<{ $color: RGBColor }>`
  background-color: rgba(
    ${(props) =>
      `${props.$color.r}, ${props.$color.g}, ${props.$color.b}, ${props.$color.a}`}
  );
`;

const Xcontent = (props: x_content) => {
  const {
    r = 50,
    g = 17,
    b = 15,
    a = 0.1,
    xData,
    yData,
    isMine,
    isData,
    pixelId,
    targetMemberSeq,
    reloadCallback,
  } = props;

  const [remainCnt, setRemainCnt] = useRecoilState(remainCntRecoil);
  const [, setAlertState] = useRecoilState(alertModalRecoil);

  const [isColorPicker, setIsColorPicker] = React.useState<boolean>(false);
  const [isWrightMessage, setIsWrightMessage] = React.useState<boolean>(false);
  const [isContent, setIsContent] = React.useState<boolean>(false);

  const [wrightMessage, setWrightMessage] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [sendUser, setSendUser] = React.useState<string>("");

  const memberNickname = useParams().userId as string;

  const [userOverWrightcolor, setUserOverWrightcolor] =
    React.useState<RGBColor>({
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    });

  const colorPickerChangeHandler = (color: ColorResult) => {
    setUserOverWrightcolor(color.rgb);
  };

  const openColorPickerHandler = () => {
    if (isData) {
      void getPaint({
        pixelId: pixelId as number,
      }).then((res) => {
        if (res.data?.status.code === "E20000") {
          setContent(res.data.data.contents);
          setSendUser(res.data.data.memName);
          setIsContent(true);
        }
      });
    } else if (!isMine && remainCnt > 0) {
      setIsColorPicker(true);
    } else if (remainCnt === 0) {
      setAlertState({
        isOpen: true,
        alertText: "남은 횟수가 없습니다.",
      });
    }
  };

  const messagePopupOpenHandler = () => {
    setIsColorPicker(false);
    setIsWrightMessage(true);
  };

  const closeAllHandler = () => {
    setIsColorPicker(false);
    setIsWrightMessage(false);
    setIsContent(false);
    setUserOverWrightcolor({
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    });
  };

  const changeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWrightMessage(e.target.value);
  };

  const postPaintHandler = () => {
    void postPaint({
      targetMemberSeq,
      contents: wrightMessage,
      x: xData,
      y: yData,
      r: userOverWrightcolor.r as number,
      g: userOverWrightcolor.g as number,
      b: userOverWrightcolor.b as number,
      a: userOverWrightcolor.a as number,
    }).then((res) => {
      if (res.data?.status.code === "E20002") {
        setRemainCnt((prev) => prev - 1);
        reloadCallback();
        closeAllHandler();
      }
    });
  };

  return (
    <>
      <XcontentComponent
        className="xContent"
        onClick={openColorPickerHandler}
        $color={{ r, g, b, a }}
      />
      <Modal open={isColorPicker}>
        <div className="exit">
          <div className="iconWrap" onClick={closeAllHandler}>
            <CloseIcon />
          </div>
        </div>
        <div className="contentPopupCard">
          <ChromePicker
            color={userOverWrightcolor}
            onChange={colorPickerChangeHandler}
          />
          <div className="button wrap">
            <button className="messageButton" onClick={messagePopupOpenHandler}>
              메세지 남기기
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={isWrightMessage}>
        <div className="exit">
          <div className="iconWrap" onClick={closeAllHandler}>
            <CloseIcon />
          </div>
        </div>
        <div className="contentPopupCard message">
          <p>11.11데이 메세지를 전하세요</p>
          <div className="inputBox">
            <div className="inputWrap">
              <input value={memberNickname} readOnly />
            </div>
          </div>
          <textarea
            placeholder="보낼 사람 한 명쯤은 있잖아요? 😙 (placeholder)"
            value={wrightMessage}
            onChange={changeTextAreaHandler}
          />
          <div className="button wrap">
            <button className="messageButton" onClick={postPaintHandler}>
              메세지 보내기
            </button>
            <div className="iconWrap">
              <div className="icon">
                <DubleOneIcon />
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
                {sendUser}
              </p>
            </div>
          </div>
          <textarea value={content} readOnly />
        </div>
      </Modal>
    </>
  );
};

/**
 *
 */
const MainPage = () => {
  const [, setAlertState] = useRecoilState(alertModalRecoil);

  const [targetMemberSeq, setTargetMemberSeq] = React.useState<number>(0);
  const [isMine, setIsMine] = React.useState<boolean>(false);
  const [pixelList, setPixelList] = React.useState<
    Array<{
      targetMemberSeq: number;
      contents: string;
      pixelId: number;
      x: number;
      y: number;
      r: number;
      g: number;
      b: number;
      a: number;
    }>
  >([]);

  const memberNickname = useParams().userId as string;

  const linkCopyHandler = () => {
    navigator.clipboard.writeText(window.location.href).then((res) => {
      setAlertState({
        isOpen: true,
        alertText: "링크 복사 완료!",
      });
    });
  };

  const reloadInfoHandler = () => {
    void memberInfo({ nickname: memberNickname }).then((res) => {
      if (res.data?.status.code === "E20000") {
        setPixelList(res.data.data.pixelList);
        setIsMine(res.data.data.mine);
        setTargetMemberSeq(res.data.data.memSeq);
      }
    });
  };

  const kakaoLinkShareHandler = () => {
    if ((window as any).Kakao) {
      const kakao = (window as any).Kakao;
      // if (!kakao.isInitialized()) {
      //   kakao.init(process.env.REACT_APP_KAKAO_KEY);
      // }
      kakao.Share.createDefaultButton({
        container: "#kakaotalk-sharing-btn",
        objectType: "feed",
        content: {
          title: "dot X dot",
          description: "",
          imageUrl: "https://dotxdot.xyz/thumnail.jpg",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [],
      });
    }
  };

  React.useEffect(() => {
    void memberInfo({ nickname: memberNickname }).then((res) => {
      if (res.data?.status.code === "E20000") {
        setPixelList(res.data.data.pixelList);
        setIsMine(res.data.data.mine);
        setTargetMemberSeq(res.data.data.memSeq);
      }
    });
  }, [memberNickname]);

  React.useEffect(() => {
    const kakao = (window as any).Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);

  return (
    <MainPageWrap>
      <div className="content wrap">
        {yList.map((yData) => (
          <div className="yWrap" key={`ywrap_${yData}`}>
            {xList.map((xData) => {
              const findValue = pixelList.find(
                (val) => val.x === xData && val.y === yData
              );
              if (findValue) {
                return (
                  <Xcontent
                    targetMemberSeq={targetMemberSeq}
                    pixelId={findValue.pixelId}
                    xData={xData}
                    yData={yData}
                    r={findValue.r}
                    g={findValue.g}
                    b={findValue.b}
                    a={findValue.a}
                    isMine={isMine}
                    isData={true}
                    reloadCallback={reloadInfoHandler}
                    key={`content_${yData}_${xData}`}
                  />
                );
              }
              return (
                <Xcontent
                  targetMemberSeq={targetMemberSeq}
                  xData={xData}
                  yData={yData}
                  isMine={isMine}
                  isData={false}
                  reloadCallback={reloadInfoHandler}
                  key={`content_${yData}_${xData}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      {isMine && (
        <div className="button wrap">
          <button className="link" onClick={linkCopyHandler}>
            <LinkIcon />
            <span>링크복사</span>
          </button>
          <button
            className="kakao"
            onClick={kakaoLinkShareHandler}
            id="kakaotalk-sharing-btn"
          >
            <Kakao />
            <span>카카오톡 공유</span>
          </button>
        </div>
      )}
    </MainPageWrap>
  );
};

export default MainPage;

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
