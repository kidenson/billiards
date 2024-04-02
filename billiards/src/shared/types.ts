export default interface Ball {
  id: string,
  x: number, 
  y: number, 
  radius: number, 
  color: string,
  velocity: Velocity,
  mass: number,
  hover: boolean
}

export interface Velocity {
  x: number;
  y: number
}