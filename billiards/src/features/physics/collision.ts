import Ball, { Velocity } from '../../shared/types';

export function rotate(velocity: Velocity, angle: number) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };
  return rotatedVelocities;
}

export default function resolveCollision(
  b1: Ball,
  b2: Ball,
  restitution: number = 0.8
) {
  const xVelocityDiff = b1.velocity.x - b2.velocity.x;
  const yVelocityDiff = b1.velocity.y - b2.velocity.y;

  const xDist = b2.x - b1.x;
  const yDist = b2.y - b1.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(b2.y - b1.y, b2.x - b1.x);
    const m1 = b1.mass;
    const m2 = b2.mass;
    const u1 = rotate(b1.velocity, angle);
    const u2 = rotate(b2.velocity, angle);

    const v1 = {
      x: (((m1 - m2) * u1.x + (m2 + m2) * u2.x) / (m1 + m2)) * restitution,
      y: u1.y,
    };
    const v2 = {
      x: (((m1 + m1) * u1.x + (m2 - m1) * u2.x) / (m1 + m2)) * restitution,
      y: u2.y,
    };

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    b1.velocity.x = vFinal1.x;
    b1.velocity.y = vFinal1.y;
    b2.velocity.x = vFinal2.x;
    b2.velocity.y = vFinal2.y;
  }
}
