import { Offset } from '@/types';
import { Tooltip } from '@mantine/core';
import Link from 'next/link';
interface PointerProps {
  label: string;
  offset: Offset;
  href: string;
}
export function Pointer(props: PointerProps) {
  return (
    <Link href={props.href}>
      <Tooltip
        label={props.label}
        arrowOffset={10}
        arrowSize={4}
        withArrow
        opened
        classNames={{
          tooltip: 'text-xl bg-black bg-opacity-70',
        }}
      >
        <div
          style={{
            left: props.offset.left + '%',
            top: props.offset.top + '%',
          }}
          className="absolute transition-all "
        >
          <div className="bg-black anime active:scale-95  bg-opacity-40  w-[6vw] h-[6vw] rounded-full border-4 border-white"></div>
        </div>
      </Tooltip>
    </Link>
  );
}
