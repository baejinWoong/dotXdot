import React from "react";
import Modal from "../common/Modal";
import { useRecoilState } from "recoil";
import { alertModalRecoil } from "../../recoil/atom";
import { alertModalState } from "../../recoil/defaultValue";

/**
 *
 */
const AlertModal = () => {
  const [alertState, setAlertState] = useRecoilState(alertModalRecoil);

  const closeAlertHaendler = () => {
    alertState.clickButtonCallback?.();
    setAlertState(alertModalState);
  };

  return (
    <Modal open={alertState.isOpen}>
      <div className="alertModal wrap">
        <p className="content">{alertState.alertText}</p>

        <button onClick={closeAlertHaendler}>확인</button>
      </div>
    </Modal>
  );
};

export default AlertModal;

