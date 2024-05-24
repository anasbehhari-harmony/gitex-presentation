import { ImageSection } from '@/components/Image';
import { VideoPlayer } from '@/components/Video';
import { ModuleNames } from '@/enums';
import { getOneModule } from '@/services';
import { ModuleData } from '@/types';
import { Transition } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import clsx from 'clsx';
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
  const [controls, controlsAction] = useDisclosure(false);
  const [expended, action] = useDisclosure(false);
  const videoContainerClassNames = clsx('fixed z-[900] top-0 right-0  h-full !transition-all', {
    'w-full': expended,
    'w-[80%]': !expended,
  });
  useHotkeys([['escape', videoVisible ? hideVideo : () => {}]]);

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
      const currentPointer = props.moduleData.pointers.find(
        (el) => el.href == (router.query.slug as string[]).join('/')
      );
      if (currentPointer) {
        setCurrentVideo(currentPointer.videoHref);
        showVideo();
      }
    } else {
      setCurrentVideo(undefined);
      hideVideo();
    }
  }, [router.query.slug]);

  const handleBackClick = () => {
    const ExistingQuery = router.query;
    controlsAction.close();
    router.push({
      pathname: router.pathname,
      query: {
        slug: ExistingQuery.slug?.slice(0, 1),
      },
    });
  };
  const handleSwipingLeft = () => {
    if (!expended) {
      action.open();
    }
  };
  const handleSwipingRight = () => {
    if (expended) {
      action.close();
    }
  };
  const handleSwipingUp = () => {
    if (!controls) {
      controlsAction.open();
    }
  };
  const handleSwipingDown = () => {
    if (controls) {
      controlsAction.close();
    }
  };
  return (
    <div className="w-full h-full relative">
      <ImageSection
        currentImage={currentImage}
        mounted={mounted}
        pointers={props.moduleData.pointers}
      />

      <Transition mounted={videoVisible} transition="fade-up">
        {(styles) => (
          <div style={styles} className={videoContainerClassNames}>
            <VideoPlayer
              currentVideo={currentVideo}
              videoVisible={videoVisible}
              onBackClicked={handleBackClick}
              onSwipeLeft={handleSwipingLeft}
              onSwipeRight={handleSwipingRight}
              onSwipeDown={handleSwipingDown}
              onSwipeUp={handleSwipingUp}
              withControls={controls}
            />
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
