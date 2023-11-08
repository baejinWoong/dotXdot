import http from "./http";
import { I_getMemberProps, I_getPaintProps, I_getPaintsProps, I_postPaintProps } from './interface/main';

export const memberInfo = async (params: I_getMemberProps) => {
  const url = `/member/${params.nickname}`;
  return await http.get(url);
};

export const postPaint = async (params: I_postPaintProps) => {
  const url = "/paint";
  return await http.post(url, params);
};

export const getPaint = async (params: I_getPaintProps) => {
  const url = `/paint?x=${params.x}&y=${params.y}&id=${params.targetMemberSeq}`;
  return await http.get(url);
};

export const getPaints = async (params: I_getPaintsProps) => {
  const url = `/paints?${params.lastId ? `lastId=${params.lastId}&` : ''}pageSize=${params.pageSize}`;
  return await http.get(url);
};