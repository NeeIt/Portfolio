import {IPhoto} from "@interfaces/photo.interface";

export const MY_PHOTO = { id: 1, src: '/assets/img/me_2.png', name: 'my-photo'};

export const EXPERIENCE_START_DATE = '2020-05-01';

export const HOBBIES = [
  {
    name: 'HOBBIES.ART',
    icon: 'art'
  },
  {
    name: 'HOBBIES.SPORT',
    icon: 'sport'
  },
  {
    name: 'HOBBIES.TRAVEL',
    icon: 'travel'
  },
  {
    name: 'HOBBIES.PHOTO',
    icon: 'photo'
  },
  {
    name: 'HOBBIES.GAMES',
    icon: 'games'
  }];

export const LOCATION_PHOTOS: IPhoto[] =
  [
    {
      id: 12,
      name: 'korean photo 2',
      src: '/assets/img/posts/location_2.jpg',
    },
    {
      id: 11,
      name: 'korean photo 1',
      src: '/assets/img/posts/location_5.jpg',
    },
    {
      id: 13,
      name: 'korean photo 3',
      src: '/assets/img/posts/location_3.jpg',
    },
    {
      id: 14,
      name: 'korean photo 4',
      src: '/assets/img/posts/location_4.jpg',
    },
    {
      id: 15,
      name: 'korean photo 5',
      src: '/assets/img/posts/location_6.jpg',
    },
  ];

export const ART_WORKS: IPhoto[] =
  [
    {
      id: 2,
      name: 'Butler',
      src: '/assets/img/posts/art_4.jpg',
      description: 'I have a deep admiration for butlers.',
      date: '2020-01-01',
    },
    {
      id: 1,
      name: 'Red street',
      src: '/assets/img/posts/art_2.jpg',
      description: 'I portrayed my favorite character using a \'fish-eye\' perspective, adding a unique twist to the depiction.',
      date: '2020-01-01',
    },
    {
      id: 3,
      name: 'Child book art',
      src: '/assets/img/posts/art_1.jpg',
      description: 'This artwork, styled like a children\'s book illustration, is a dream come true for me, as I\'ve always aspired to illustrate a heartwarming children\'s story.',
      date: '2020-01-01',
    },
    {
      id: 5,
      name: 'Art for VTuber streamer',
      src: '/assets/img/posts/art_3.jpg',
      description: 'I crafted this illustration for a friend who streams on Twitch. She later used it for her social media posts and as a backdrop during her broadcasts.',
      date: '2020-01-01',
    },
    {
      id: 4,
      name: 'Art for my friend',
      src: '/assets/img/posts/art_5.jpg',
      description: 'I created this drawing for my friend\'s birthday, infusing it with various Easter eggs that reflect our shared stories and experiences.',
      date: '2020-01-01',
    },
  ];
