const targets: Target[] = [
  {
    name: 'marina',
    tl: [1050, 1550],
    br: [1520, 1642],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-dockRight.jpg',
    id: 3
  },
  {
    name: 'beachfront',
    tl: [1600, 1600],
    br: [2310, 1466],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-beach1.jpg',
    id: 0
  },
  {
    name: 'Guest House',
    tl: [1200, 1250],
    br: [1774, 1338],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-overCaretaker.jpg',
    id: 4
  },
  {
    name: 'Caretaker House',
    tl: [1400, 1300],
    br: [1774, 1338],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/small-betweenCaretaker.jpg',
    id: 2
  },

  {
    name: 'dock',
    tl: [1320, 1450],
    br: [1828, 1068],
    src: 'https://s3.amazonaws.com/sage.pumpkin-key/dock.jpg',
    id: 5
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
