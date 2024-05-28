import { ImageSection } from '@/components/Image';
import { VideoPlayer } from '@/components/Video';
import { ModuleData } from '@/types';
import { Transition } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const data = [
  {
    slug: '/smart-industry',
    image: '/assets/smart-industry.svg',
    pointers: [
      {
        label: 'smart-industry 1',
        offset: {
          top: 54,
          left: 28,
        },
        href: 'smart-industry/video/1',
        videoHref:
          '/assets/videos/smart-industry-1.mp4',
      },
      {
        label: 'smart-industry 2',
        offset: {
          top: 24,
          left: 53,
        },
        href: 'smart-industry/video/2',
        videoHref:
        '/assets/videos/smart-industry-2.mp4',
      },
    ],
  },
  {
    slug: '/smart-hospital',
    image: '/assets/smart-hospital.svg',
    pointers: [
      {
        label: 'smart-hospital 1',
        offset: {
          top: 50,
          left: 30,
        },
        href: 'smart-hospital/video/1',
        videoHref:
        '/assets/videos/smart-hospital.mp4',
      },
    ],
  },
  {
    slug: '/smart-administration',
    image: '/assets/smart-administration.svg',
    pointers: [
      {
        label: 'smart-administration 1',
        offset: {
          top: 44,
          left: 55,
        },
        href: 'smart-administration/video/1',
        videoHref:
        '/assets/videos/smart-administration.mp4',
      },
    ],
  },
  {
    slug: '/smart-university',
    image: '/assets/smart-university.svg',
    pointers: [
      {
        label: 'smart-university 1',
        offset: {
          top: 33,
          left: 70,
        },
        href: 'smart-university/video/1',
        videoHref:
        '/assets/videos/smart-university.mp4',
      },
    ],
  },
];



export default function Index() {
  const router = useRouter();
  const [mounted, { open, close }] = useDisclosure(false);
  const [videoVisible, { open: showVideo, close: hideVideo }] = useDisclosure(false);
  const [currentVideo, setCurrentVideo] = useState<string | undefined>(undefined);
  const [controls, controlsAction] = useDisclosure(false);
  const [expended, action] = useDisclosure(false);
  const [currentModule, setCurrentModule] = useState<ModuleData>(data[0]);
  const [currentImage, setCurrentImage] = useState<string>(currentModule.image);
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
    const newImage = currentModule.image;
    if (currentImage !== newImage) {
      close();
      const timeoutId = setTimeout(() => {
        setCurrentImage(newImage);
        open();
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [currentModule.image]);

  useEffect(() => {
    if (router.query?.slug) {
      const slug = router.query?.slug[0];
      const module = data.find((item) => item.slug === '/' + slug);
      console.log(module,slug);
      if (module) {
        setCurrentModule(module);
      }
    }
  }, [router.query?.slug]);
  useEffect(() => {
    if (router.query.slug && router.query.slug[1] != null) {
      const currentPointer = currentModule.pointers.find(
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
        pointers={currentModule.pointers}
      />

      <Transition mounted={videoVisible} transition="fade-up" timingFunction="ease">
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

