import { NextApiRequest, NextApiResponse } from 'next';

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
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        label: 'smart-industry 2',
        offset: {
          top: 24,
          left: 53,
        },
        href: 'smart-industry/video/2',
        videoHref:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
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
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
      },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    res.status(400).json({ error: 'Invalid slug' });
    return;
  }

  const moduleData = data.find((item) => item.slug === `/${slug}`);

  if (moduleData) {
    res.status(200).json(moduleData);
  } else {
    res.status(404).json({ error: 'Module not found' });
  }
}
