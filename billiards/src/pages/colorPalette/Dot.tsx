import React, { Dispatch, SetStateAction } from 'react';

interface DotProps {
  setDot: Dispatch<SetStateAction<boolean>>;
  setColorBall: Dispatch<SetStateAction<string>>;
  color: string;
}

function Dot({
  setDot,
  setColorBall,
  color,
}: DotProps) {
  function handleColor(color: string) {
    setDot(true);
    setColorBall(color);
  }
  return (
    <div onClick={() => handleColor(color)}>
      <span className="dot" style={{ backgroundColor: `#${color}` }}>
        <div className='dotInner'>{`#${color}`}</div>
      </span>
    </div>
  );
}

export default Dot;