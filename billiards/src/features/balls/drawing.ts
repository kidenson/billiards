import React from 'react';
import resolveCollision from '../physics/collision';
import Ball from '../../shared/types';

export function drawBall(
  context: CanvasRenderingContext2D,
  ball: Ball,
  moving: boolean
): void {
  const gradient = context.createRadialGradient(
    ball.x - ball.radius / 4,
    ball.y - ball.radius / 4,
    0,
    ball.x,
    ball.y,
    ball.radius
  );
  gradient.addColorStop(0, '#E9E7F5');
  gradient.addColorStop(1, ball.color);

  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);

  context.fillStyle = gradient;

  context.strokeStyle = ball.hover && !moving ? '#B498B5' : ball.color; // Set stroke color
  context.lineWidth = ball.hover && !moving ? 3 : 1; // Increase line width if hovered
  context.fill();
  context.stroke();
}

interface UpdateProps {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  ballsRef: React.MutableRefObject<Ball[]>;
  mouseXRef: React.MutableRefObject<number>;
  mouseYRef: React.MutableRefObject<number>;
  moving: boolean;
}

export default function update({
  canvas,
  context,
  canvasWidth,
  canvasHeight,
  ballsRef,
  mouseXRef,
  mouseYRef,
  moving,
}: UpdateProps): void {
  if (canvas && context) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    ballsRef.current.forEach((ball: Ball, index: number) => {
      ball.x += ball.velocity.x;
      ball.y += ball.velocity.y;
      handleMouseCollision({ ball, mouseXRef, mouseYRef, moving });

      for (let i = index + 1; i < ballsRef.current.length; i++) {
        const otherBall = ballsRef.current[i];
        const distanceX = otherBall.x - ball.x;
        const distanceY = otherBall.y - ball.y;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY
        );

        if (distance <= ball.radius + otherBall.radius) {
          resolveCollision(ball, otherBall);
        }
      }

      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvasWidth) {
        ball.velocity.x *= -1;
      }
      if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvasHeight) {
        ball.velocity.y *= -1;
      }

      drawBall(context, ball, moving);
    });
  }
}

export function handleMouseCollision({
  ball,
  mouseXRef,
  mouseYRef,
  moving,
}: {
  ball: Ball;
  mouseXRef: React.MutableRefObject<number>;
  mouseYRef: React.MutableRefObject<number>;
  moving: boolean;
}) {
  if (moving) {
    const distanceX = ball.x - mouseXRef.current;
    const distanceY = ball.y - mouseYRef.current;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance <= ball.radius + 10) {
      const angle = Math.atan2(distanceY, distanceX);
      ball.velocity.x += Math.cos(angle) * 1;
      ball.velocity.y += Math.sin(angle) * 1;
    }
  }
}

export function isHovered(ball: Ball, mouseX: number, mouseY: number): boolean {
  const distanceX = ball.x - mouseX;
  const distanceY = ball.y - mouseY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  return distance <= ball.radius;
}

export function stopBalls(
  ballsRef: React.MutableRefObject<Ball[]>,
  context: CanvasRenderingContext2D,
  moving: boolean,
  colorBall: string,
  clicked: string
) {
  ballsRef.current.forEach((ball: Ball) => {
    ball.velocity.x = 0;
    ball.velocity.y = 0;
    if (ball.id === clicked) {
      ball.color = '#' + colorBall;
      drawBall(context, ball, moving);
    } else {
      drawBall(context, ball, moving);
    }
  });
}
