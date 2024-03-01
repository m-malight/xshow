export type userDetail = {
  id: number | string;
  photoURL: string;
};

export type activeIconType = {
  "btn-home": boolean;
  "btn-film": boolean;
  "btn-television": boolean;
  "btn-bookmark": boolean;
};

export type searchType = {
  onSearch?: (e: any) => void;
};

export type videoType = {
  id: number;
  src: string;
  cast: string;
  name: string | undefined;
};
export type scaffoldType = {
  children: React.JSX.Element;
  removeSearch?: boolean;
  activeIcon?: activeIconType;
  activateSearch?: (e: any) => void;
};
