import React from 'react';

function Dot({
  setDot,
  setColorBall,
  color,
}: {
  setDot: React.Dispatch<React.SetStateAction<boolean>>;
  setColorBall: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}) {
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
