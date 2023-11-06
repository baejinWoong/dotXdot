import React from "react";
import MainPageWrap from "../components/common/MainPageWrap";
import { SketchPicker, Color, ColorResult } from "react-color";
import "../styles/mainPage.scss";
import Modal from "../components/common/Modal";

const xList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const yList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

interface x_content {
  yData: number;
  xData: number;
}

const Xcontent = (props: x_content) => {
  const [isColorPicker, setIsColorPicker] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const colorPickerChangeHandler = (color: ColorResult) => {
    setColor(color.rgb);
  };

  const openColorPickerHandler = () => {
    setIsColorPicker(true);
  };

  const closeColorPickerHandler = () => {
    console.log("click");
    setIsColorPicker(false);
  };

  return (
    <>
      <div className="xContent" onClick={openColorPickerHandler}></div>
      <Modal open={isColorPicker}>
        <div className="popOver" onClick={closeColorPickerHandler}>
          <SketchPicker color={color} onChange={colorPickerChangeHandler} />
          <div>{isColorPicker ? "true" : "false"}</div>
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
    </MainPageWrap>
  );
};

export default MainPage;

