const targets: Target[] = [
  // {
  //   name: 'marina',
  //   tl: [1050, 1400],
  //   br: [1520, 1642],
  //   src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-dockRight.jpg',
  //   id: 3
  // },
  {
    name: 'beachfront',
    tl: [1600, 1400],
    br: [2310, 1466],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-beach1.jpg',
    id: 0,
    initialTheta: 6.169
  },
  {
    name: 'Caretaker House Aerial',
    tl: [1200, 1150],
    br: [1774, 1338],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-overCaretaker.jpg',
    id: 4,
    initialTheta: 10.828
  },
  {
    name: 'Caretaker House',
    tl: [1400, 1200],
    br: [1774, 1338],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-betweenCaretaker.jpg',
    id: 2,
    initialTheta: 9.302589718158902
  },

  {
    name: 'marina',
    tl: [1300, 1375],
    br: [1828, 1068],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/dock.jpg',
    id: 5,
    initialTheta: 6.716
  }
];
export default targets;
export type Vector2 = number[];

export interface Target {
  name: string;
  tl: Vector2;
  br: Vector2;
  src: string;
  id: number;
  initialTheta: number;
}

let isPreloaded: boolean = true;

export function preload() {
  if (!isPreloaded) {
    targets.forEach(target => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = target.src;
    });

    isPreloaded = true;
  }
}
