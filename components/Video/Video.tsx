import { IconBack } from '@/icons';
import { isVideoPlaying } from '@/lib';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';

interface VideoProps {
  videoVisible: boolean;
  currentVideo: string | undefined;
  onBackClicked: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  withControls: boolean;
}
export function VideoPlayer(props: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const classNames = clsx(
    'video-container !transition-all duration-700 absolute right-0 flex justify-center items-center top-0 z-[999] h-full bg-black w-full'
  );

  const handlers = useSwipeable({
    onSwipedLeft: props.onSwipeLeft,
    onSwipedRight: props.onSwipeRight,
    onSwipedUp: props.onSwipeUp,
    onSwipedDown: props.onSwipeDown,
    onSwiped: (evnt) => {
      console.log(evnt);
    },
  });
  useEffect(() => {
    if (ref.current && props.currentVideo) {
      const videoElement = ref.current;
      videoElement.src = props.currentVideo;
      videoElement.onclick = () => {
        if (!props.withControls) {
          if (isVideoPlaying(videoElement)) {
            videoElement.pause();
          } else {
            videoElement.play();
          }
        }
      };
    }
  }, [ref, props.currentVideo]);
  return (
    <div className={classNames} {...handlers}>
      <div
        className="transition-all absolute left-8 top-8 back z-20 cursor-pointer bg-yellow-500 rounded-full text-black p-2 active:scale-95"
        onClick={props.onBackClicked}
      >
        <IconBack className="size-14" />
      </div>

      <video
        id="video"
        ref={ref}
        controls={props.withControls}
        autoPlay
        className="w-full h-full z-10 left-0  object-cover"
      />
    </div>
  );
}
