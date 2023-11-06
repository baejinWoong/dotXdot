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

