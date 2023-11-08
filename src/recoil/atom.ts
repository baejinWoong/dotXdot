import { atom } from "recoil";
import {
  accessTokenState,
  alertModalState,
  confirmModalState,
  loaderModalState,
  remainCntState,
  tableState,
  userNameState,
} from "./defaultValue";

export const ExampleState = atom({
  key: "Example",
  default: false,
});

export const alertModalRecoil = atom({
  key: "alertModalState",
  default: alertModalState,
});

export const confirmModalRecoil = atom({
  key: "confirmModalState",
  default: confirmModalState,
});

export const loaderModalRecoil = atom({
  key: "loaderModalState",
  default: loaderModalState,
});

export const tableRecoil = atom({
  key: "tableState",
  default: tableState,
});

export const accessTokenRecoil = atom({
  key: "accessTokenState",
  default: accessTokenState,
});

export const remainCntRecoil = atom({
  key: "remainCntState",
  default: remainCntState,
});

export const userNameRecoil = atom({
  key: "userNameState",
  default: userNameState,
});

