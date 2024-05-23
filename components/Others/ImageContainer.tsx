import { Flex, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

interface ImageContainerProps {
  slug: string;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({ slug }) => {
  const [mounted, { open, close }] = useDisclosure(false);
  const [currentImage, setCurrentImage] = useState<string>('/assets/smart-industry.svg');
  const [newImage, setNewImage] = useState<string>('/assets/smart-industry.svg');

  useEffect(() => {
    if (slug) {
      setNewImage(`/assets/${slug}.svg`);
    }
  }, [slug]);

  useEffect(() => {
    if (currentImage !== newImage) {
      close();
      const timeoutId = setTimeout(() => {
        setCurrentImage(newImage);
        open();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [newImage]);

  return (
    <Transition mounted={mounted} transition="pop">
      {(styles) => (
        <Flex style={styles} align="center" justify="center" className="w-full h-full">
          <img className="w-[80%] h-[80%]" src={currentImage} alt="" />
        </Flex>
      )}
    </Transition>
  );
};
