import { Aside, AsideItem } from '@/components/Aside';
import { ModulePathnames } from '@/enums';
import { Flex } from '@mantine/core';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}
const data: AsideItem[] = [
  {
    content: 'Smart Industry',
    href: ModulePathnames.SMART_INDS,
  },
  {
    content: 'Smart Hospital',
    href: ModulePathnames.SMART_HOSP,
  },
  {
    content: (
      <div className="text-left">
        Smart <br /> Administration
      </div>
    ),
    href: ModulePathnames.SMART_ADM,
  },
  {
    content: 'Smart University',
    href: ModulePathnames.SMART_UNIV,
  },
];

export function AppLayout(props: AppLayoutProps) {
  return (
    <main className={'relative w-screnn h-screen'}>
      <Flex className="w-full h-full ">
        <Aside data={data} />
        <div className="w-[calc(100%-20%)]">{props.children}</div>
      </Flex>
    </main>
  );
}
