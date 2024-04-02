import React, { useState } from 'react';
import Palette from './Palette';
import './PickColor.css';

function PickColor({
  setPalette,
  setDot,
  setColorBall,
  palTop,
  palLeft,
  setMoving,
  palette,
}: {
  setPalette: React.Dispatch<React.SetStateAction<boolean>>;
  setDot: React.Dispatch<React.SetStateAction<boolean>>;
  setColorBall: React.Dispatch<React.SetStateAction<string>>;
  palTop: number;
  palLeft: number;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
  palette: boolean;
}) {
  const [moded, setModed] = useState(false);
  function pal(): void {
    setModed((prev) => !prev);
    setMoving((prev) => !prev);
    palette && setPalette((prev) => !prev);
  }
  return (
    <>
      <div
        className="change"
        style={
          moded
            ? { backgroundColor: '#906dcb' }
            : { backgroundColor: '#ba90ff' }
        }
        onClick={() => pal()}
      >
        <div className="changeText">Color change mode</div>
      </div>
      {palette && (
        <Palette
          setDot={setDot}
          setColorBall={setColorBall}
          palTop={palTop}
          palLeft={palLeft}
        />
      )}
    </>
  );
}

export default PickColor;
