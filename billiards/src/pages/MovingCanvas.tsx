import { useEffect, useRef, useState } from 'react';
import generateBalls from '../features/balls/generateballs';
import update, { stopBalls } from '../features/balls/drawing';
import PickColor from './colorPalette/PickColor';
import handleMouseMove, { handleClick } from '../shared/mouseEvents';

function MovingCanvas({
  setColorBall,
  colorBall,
  palette,
  setPalette,
}: {
  setColorBall: React.Dispatch<React.SetStateAction<string>>;
  colorBall: string;
  palette: boolean;
  setPalette: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const ballsRef = useRef(generateBalls(10));
  const [moving, setMoving] = useState(true);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const [palTop, setPaltTop] = useState(0);
  const [palLeft, setPalLeft] = useState(0);
  const [clicked, setClicked] = useState('');
  const [dot, setDot] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const canvasWidth = canvas?.width || 0;
    const canvasHeight = canvas?.height || 0;

    const draw = () => {
      if (canvas && context && moving) {
        update({
          canvas,
          context,
          canvasWidth,
          canvasHeight,
          ballsRef,
          mouseXRef,
          mouseYRef,
          moving,
        });

        if (moving) {
          animationFrameRef.current = requestAnimationFrame(draw);
        }
      }
    };

    const clickHandler = (event: MouseEvent) =>
      handleClick(
        event,
        canvas!,
        ballsRef,
        setPaltTop,
        setPalLeft,
        setPalette,
        setClicked
      );
    const mouseMoveHandler = (event: MouseEvent) =>
      handleMouseMove(
        event,
        canvas!,
        context!,
        mouseXRef,
        mouseYRef,
        ballsRef,
        canvasWidth,
        canvasHeight,
        moving
      );
    canvas?.addEventListener('mousemove', mouseMoveHandler);
    canvas?.addEventListener('click', clickHandler);

    if (moving) {
      draw();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (context) {
        stopBalls(ballsRef, context, moving, colorBall, clicked);
      }
    }

    if (dot && context) {
      stopBalls(ballsRef, context, moving, colorBall, clicked);
      setDot(false);
      setPalette(false);
    }

    return () => {
      canvas?.removeEventListener('mousemove', mouseMoveHandler);
      canvas?.removeEventListener('click', clickHandler);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [moving, dot]);

  return (
    <>
      <div className="commonCont">
        <div className="canvasCont">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            style={{ border: '10px solid aliceblue', borderRadius: '50px' }}
          />
        </div>
        <PickColor
          setPalette={setPalette}
          setDot={setDot}
          setColorBall={setColorBall}
          palTop={palTop}
          palLeft={palLeft}
          setMoving={setMoving}
          palette={palette}
        />
      </div>
    </>
  );
}

export default MovingCanvas;
