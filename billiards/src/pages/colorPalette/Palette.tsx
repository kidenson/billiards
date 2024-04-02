import Dot from './Dot';
import getRandomColors from '../../shared/colors';

function Palette({
  setDot,
  setColorBall,
  palTop,
  palLeft,
}: {
  setDot: React.Dispatch<React.SetStateAction<boolean>>;
  setColorBall: React.Dispatch<React.SetStateAction<string>>;
  palTop: number;
  palLeft: number;
}) {
  const colors = getRandomColors(5);
  return (
    <div className="paletteContainer" style={{ top: palTop, left: palLeft }}>
      Paint your balls!
      <div>
        {colors.map((color) => (
          <Dot
            setDot={setDot}
            setColorBall={setColorBall}
            key={color.id}
            color={color.color}
          />
        ))}
      </div>
    </div>
  );
}

export default Palette;
