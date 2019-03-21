export default [
  {
    name: 'private dock',
    tl: [800, 1450],
    br: [1520, 1642],
    src: 'dock.jpg'
  },
  {
    name: 'beachfront',
    tl: [1600, 1500],
    br: [2310, 1466],
    src: 'beach.jpg'
  },
  {
    name: 'mansion',
    tl: [1270, 1240],
    br: [1774, 1338],
    src: 'house.jpg'
  },
  {
    name: 'tennis courts',
    tl: [1500, 850],
    br: [1828, 1068],
    src: 'quarters.jpg'
  },
  {
    name: 'private resort',
    tl: [800, 700],
    br: [860, 1052],
    src: 'quarters.jpg'
  }
];

export type Vector2 = number[];

export interface Target {
  name: string;
  tl: Vector2;
  br: Vector2;
  src: string;
}
