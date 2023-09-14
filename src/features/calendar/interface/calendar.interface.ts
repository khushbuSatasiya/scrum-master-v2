export interface IProUserList {
  label: string;
  value: string;
}

export interface ICalendarInfo {
  start: string;
  end: string;
  id: string;
  title: Title;
  type: string;
}

export interface Title {
  type: string;
  key: any;
  ref: any;
  props: Props;
  _owner: any;
  _store: Store2;
}

export interface Props {
  style: Style;
  children: [any, Children];
}

export interface Style {
  display: string;
  alignItems: string;
}

export interface Children {
  type: string;
  key: any;
  ref: any;
  props: Props2;
  _owner: any;
  _store: Store;
}

export interface Props2 {
  style: Style2;
  children: string;
}

export interface Style2 {
  margin: number;
  fontSize: string;
  marginLeft: number;
  pointerEvents: string;
}

export interface Store {}

export interface Store2 {}
