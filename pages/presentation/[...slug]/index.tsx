import { Pointer } from '@/components/Pointer';
import { ModuleNames } from '@/enums';
import { IconBack } from '@/icons';
import { getOneModule } from '@/services';
import { ModuleData } from '@/types';
import { Flex, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
interface IndexPageProps {
  moduleData: ModuleData;
}

export default function Index(props: IndexPageProps) {
  const router = useRouter();
  const [mounted, { open, close }] = useDisclosure(false);
  const [videoVisible, { open: showVideo, close: hideVideo }] = useDisclosure(false);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>(undefined);
  const [currentImage, setCurrentImage] = useState<string>(props.moduleData.image);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      open();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const newImage = props.moduleData.image;
    if (currentImage !== newImage) {
      close();
      const timeoutId = setTimeout(() => {
        setCurrentImage(newImage);
        open();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [props.moduleData.image]);

  useEffect(() => {
    if (router.query.slug && router.query.slug[1] != null) {
      const currentPointer = props.moduleData.pointers.find((el) =>
        el.href.includes(router.query.slug?.[1] as string)
      );
      if (currentPointer) {
        setCurrentVideo(currentPointer.videoHref);
      }
      showVideo();
    } else {
      setCurrentVideo(undefined);
      hideVideo();
    }
  }, [router.query.slug]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="w-full h-full relative">
      <Transition mounted={mounted} transition="pop">
        {(styles) => (
          <Flex style={styles} align="center" justify="center" className="w-full h-full">
            <div className="relative w-[70%] h-[70%]">
              {props.moduleData.pointers.map((el, index) => {
                return <Pointer {...el} key={index} />;
              })}
              <img className="h-full w-full" src={currentImage} alt="" />
            </div>
          </Flex>
        )}
      </Transition>

      <Transition mounted={videoVisible} transition="pop">
        {(styles) => (
          <div
            style={styles}
            className="video-container fixed flex justify-center items-center top-0 left-0 z-[999] w-full h-full bg-black bg-opacity-90"
          >
            <div
              className="transition-all absolute left-8 top-8 back z-20 cursor-pointer bg-yellow-500 rounded-full text-black p-2 active:scale-95"
              onClick={handleBackClick}
            >
              <IconBack className="size-14 " />
            </div>
            <video controls className="w-full h-full z-10 left-0 absolute" src={currentVideo} />
          </div>
        )}
      </Transition>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  const ModuleName = slug != null && slug.length > 0 ? slug[0] : ModuleNames.SMART_INDS;
  const moduleData: ModuleData = await getOneModule(ModuleName);
  if (!moduleData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      moduleData,
    },
  };
};
