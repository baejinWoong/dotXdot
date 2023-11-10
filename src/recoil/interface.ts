export interface I_loaderModalStateType {
  isOpen: boolean;
}

export interface I_alertModalStateType {
  isOpen: boolean;
  alertText: string;
  clickButtonCallback?: () => void;
}

export interface I_confirmModalStateType {
  isOpen: boolean;
  alertText: string;
  completeButtonCallback?: () => void;
}

export interface I_tableStateType {
  page: number;
  rowsPerPage: number;
  totalCount: number;
}

export type I_oathAccessToken = string;

export type I_remainCnt = number;

export type I_getMessageCnt = number;

export type I_userName = string;
