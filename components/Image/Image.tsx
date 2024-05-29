import { Flex, Transition } from '@mantine/core';
import { Pointer } from '../Pointer';
import { Pointer as PointerType } from '@/types';
interface ImageSectionProps {
  mounted: boolean;
  pointers: PointerType[];
  currentImage: string;
}
export function ImageSection(props: ImageSectionProps) {
  return (
    <Transition mounted={props.mounted} transition="pop">
      {(styles) => (
        <Flex style={styles} align="center" justify="center" className="w-full h-full">
          <div className="relative w-[90%] h-[90%]">
            {props.pointers.map((el, index) => {
              return <Pointer {...el} key={index} />;
            })}
            <img className="h-full w-full" src={props.currentImage} alt="" />
          </div>
        </Flex>
      )}
    </Transition>
  );
}
