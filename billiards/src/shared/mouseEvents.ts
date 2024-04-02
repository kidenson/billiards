import { drawBall, isHovered } from '../features/balls/drawing';
import Ball from './types';

export default function handleMouseMove(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  mouseXRef: React.MutableRefObject<number>,
  mouseYRef: React.MutableRefObject<number>,
  ballsRef: React.MutableRefObject<Ball[]>,
  canvasWidth: number,
  canvasHeight: number,
  moving: boolean
) {
  if (canvas) {
    mouseXRef.current = event.clientX - canvas.getBoundingClientRect().left;
    mouseYRef.current = event.clientY - canvas.getBoundingClientRect().top;
  }
  ballsRef.current.forEach((ball) => {
    ball.hover = isHovered(ball, mouseXRef.current, mouseYRef.current);
  });

  context?.clearRect(0, 0, canvasWidth, canvasHeight);

  ballsRef.current.forEach((ball) => {
    drawBall(context!, ball, moving);
  });
}

export function handleClick(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ballsRef: React.MutableRefObject<Ball[]>,
  setPaltTop: React.Dispatch<React.SetStateAction<number>>,
  setPalLeft: React.Dispatch<React.SetStateAction<number>>,
  setPalette: React.Dispatch<React.SetStateAction<boolean>>,
  setClicked: React.Dispatch<React.SetStateAction<string>>
) {
  if (canvas) {
    const clickX = event.clientX - canvas.getBoundingClientRect().left;
    const clickY = event.clientY - canvas.getBoundingClientRect().top;
    let ballClicked = false;

    ballsRef.current.forEach((ball) => {
      const distanceX = ball.x - clickX;
      const distanceY = ball.y - clickY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance <= ball.radius) {
        setPaltTop(clickY);
        setPalLeft(clickX);
        setPalette(true);
        ballClicked = true;
        setClicked(ball.id);
      }
    });

    if (!ballClicked) {
      setPalette(false);
    }
  }
}
