export type Offset = {
  top: number;
  left: number;
};

export type Pointer = {
  label: string;
  offset: Offset;
  href: string;
  videoHref: string;
};

export type ModuleData = {
  slug: string;
  image: string;
  pointers: Pointer[];
};
