import { Flex } from '@mantine/core';
import { CSSProperties, ReactNode, useRef, useState } from 'react';
import { AsideChildItem } from './AsideChildItem';
export type AsideItem = { content: ReactNode; href: string };
export interface AsideProps {
  data: AsideItem[];
}
export function Aside(props: AsideProps) {
  const TrackerRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const onSelect = (ref: HTMLAnchorElement | null) => {
    if (ref) {
      setStyle({
        width: ref.clientWidth,
        height: ref.clientHeight,
        top: ref.offsetTop,
        left: ref.offsetLeft,
      });
    }
  };
  return (
    <Flex direction={'column'} className="w-[20%] border-r border-r-gray-200 ">
      <div
        ref={TrackerRef}
        className="absolute tracker bg-yellow-500 rounded-md transition-all duration-[100]"
        style={style}
      />
      {props.data != null &&
        props.data.map((el, index) => {
          return <AsideChildItem onSelect={onSelect} key={index} {...el} />;
        })}
    </Flex>
  );
}
