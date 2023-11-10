export interface I_getMemberProps {
  nickname: string;
}

export interface I_postPaintProps {
  targetMemberSeq: number,
  contents: string,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
  a: number
}

export interface I_getPaintProps {
  pixelId: number,
}

export interface I_getPaintsProps {
  lastId?: number,
  pageSize: number,
}