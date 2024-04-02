import getRandomColors from '../../shared/colors';
import Ball from '../../shared/types';

export default function generateBalls(num: number): Ball[] {
  let balls: Ball[] = [];
  for (let i = 0; i < num; i++) {
    const radius = Math.random() * 100 + 25;
    const ball: Ball = {
      id: generateRandomId(),
      radius: radius,
      x: Math.random() * (800 - 2 * radius) + radius,
      y: Math.random() * (800 - 2 * radius) + radius,
      color: '#' + getRandomColors(1)[0].color,
      hover: false,
      velocity: {
        x: 0,
        y: 0,
      },
      mass: 1,
    };

    balls.push(ball);
  }
  return balls;
}

export function randomColor(): string {
  const symbols = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}
