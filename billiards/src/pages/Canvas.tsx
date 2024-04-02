import { useState } from 'react';
import MovingCanvas from './MovingCanvas';

function Canvas() {
  const [palette, setPalette] = useState(false);

  const [colorBall, setColorBall] = useState('');
  return (
    <div className="canvasCont">
      <MovingCanvas
        setColorBall={setColorBall}
        colorBall={colorBall}
        palette={palette}
        setPalette={setPalette}
      />
    </div>
  );
}

export default Canvas;
