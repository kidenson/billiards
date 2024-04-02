import React, { useState, Dispatch, SetStateAction } from 'react';
import Palette from './Palette';
import './PickColor.css';

interface PickColorProps {
  setPalette: Dispatch<SetStateAction<boolean>>;
  setDot: Dispatch<SetStateAction<boolean>>;
  setColorBall: Dispatch<SetStateAction<string>>;
  palTop: number;
  palLeft: number;
  setMoving: Dispatch<SetStateAction<boolean>>;
  palette: boolean;
}

function PickColor({
  setPalette,
  setDot,
  setColorBall,
  palTop,
  palLeft,
  setMoving,
  palette,
}: PickColorProps) {
  const [moded, setModed] = useState<boolean>(false);

  function pal(): void {
    setModed((prev: boolean) => !prev);
    setMoving((prev :boolean) => !prev);
    if (palette) {
      setPalette((prev:boolean) => !prev);
    }
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
