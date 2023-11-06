import React from "react";
import ReactDOM from "react-dom";
import MainPageWrap from "../components/common/MainPageWrap";
import { ChromePicker, ColorResult, RGBColor } from "react-color";
import "../styles/mainPage.scss";
import styled from "styled-components";
import { Kakao, LinkIcon } from "../images/svg";

const xList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const yList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

interface x_content {
  yData: number;
  xData: number;
}

const XcontentComponent = styled.div<{ $color: RGBColor }>`
  background-color: rgba(
    ${(props) =>
      `${props.$color.r}, ${props.$color.g}, ${props.$color.b}, ${props.$color.a}`}
  );
`;

const Xcontent = (props: x_content) => {
  const [isColorPicker, setIsColorPicker] = React.useState<boolean>(false);
  const [isWrightMessage, setIsWrightMessage] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<RGBColor>({
    r: 50,
    g: 17,
    b: 15,
    a: 0.1,
  });

  const [userOverWrightcolor, setUserOverWrightcolor] =
    React.useState<RGBColor>({
      r: 50,
      g: 17,
      b: 15,
      a: 1,
    });

  const colorPickerChangeHandler = (color: ColorResult) => {
    setUserOverWrightcolor(color.rgb);
  };

  const openColorPickerHandler = () => {
    setIsColorPicker(true);
  };

  const messagePopupOpenHandler = () => {
    setIsColorPicker(false);
    setIsWrightMessage(true);
  };

  return (
    <>
      <XcontentComponent
        className="xContent"
        onClick={openColorPickerHandler}
        $color={color}
      />
      <Modal open={isColorPicker}>
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
        <div className="contentPopupCard message">
          <p>11.11데이 메세지를 전하세요</p>
          <div className="inputBox">
            <div className="inputWrap">
              <input placeholder="받는 사람?" />
            </div>
          </div>
          <textarea placeholder="보낼 사람 한 명쯤은 있잖아요? 😙 (placeholder)" />
          <div className="button wrap">
            <button className="messageButton">메세지 보내기</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

/**
 *
 */
const MainPage = () => {
  return (
    <MainPageWrap>
      <div className="content wrap">
        {yList.map((yData) => (
          <div className="yWrap" key={`ywrap_${yData}`}>
            {xList.map((xData) => (
              <Xcontent
                xData={xData}
                yData={yData}
                key={`content_${yData}_${xData}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="button wrap">
        <button className="link">
          <LinkIcon />
          <span>링크복사</span>
        </button>
        <button className="kakao">
          <Kakao />
          <span>카카오톡 공유</span>
        </button>
      </div>
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

