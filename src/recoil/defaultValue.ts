import {
  I_loaderModalStateType,
  I_alertModalStateType,
  I_confirmModalStateType,
  I_tableStateType,
  I_oathAccessToken,
} from "./interface";

export const loaderModalState: I_loaderModalStateType = {
  isOpen: false,
};

export const alertModalState: I_alertModalStateType = {
  isOpen: false,
  alertText: "",
};

export const confirmModalState: I_confirmModalStateType = {
  isOpen: false,
  alertText: "",
};

export const tableState: I_tableStateType = {
  page: 1,
  rowsPerPage: 20,
  totalCount: 0,
};

export const accessTokenState: I_oathAccessToken = "";

