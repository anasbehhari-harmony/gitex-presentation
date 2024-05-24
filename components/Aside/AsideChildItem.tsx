import { Flex } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { AsideItem } from './Aside';
interface AsideChildItemProps extends AsideItem {
  onSelect: (ref: HTMLAnchorElement | null) => void;
}
export function AsideChildItem(props: AsideChildItemProps) {
  const { query } = useRouter();
  const classNames = clsx('w-5/6 h-5/6 transition-all duration-500 active:scale-95', {
    'text-white': props.href.includes(query?.slug?.[0] as string),
    '': !props.href.includes(query?.slug?.[0] as string),
  });
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (
      query.slug != null &&
      query.slug[0] != null &&
      props.href.includes(query?.slug?.[0] as string)
    ) {
      props.onSelect(ref.current);
    }
  }, [query]);
  return (
    <Flex
      align={'center'}
      justify={'center'}
      className="h-1/4 w-full bg-transparent z-20 text-black "
    >
      <Link ref={ref} className={classNames} href={props.href}>
        <Flex align={'center'} justify={'center'} className="text-3xl font-semibold w-full h-full">
          {props.content}
        </Flex>
      </Link>
    </Flex>
  );
}
