import { Color, ColorShade } from '../types';
import { getColor } from '../utils';

interface CenterProps {
  width: number;
}

const Center: React.FC<CenterProps> = ({ width }) => {
  console.log(width);
  return (
    <div
      className={`row-start-7 row-span-3 col-start-7 col-span-3 bg-transparent h-0 w-0 border-l-${getColor(
        Color.GREEN,
        ColorShade.NORMAL
      )} border-r-${getColor(
        Color.BLUE,
        ColorShade.NORMAL
      )} border-t-${getColor(
        Color.YELLOW,
        ColorShade.NORMAL
      )} border-b-${getColor(Color.RED, ColorShade.NORMAL)}`}
      style={{
        borderLeftWidth: width / 2,
        borderRightWidth: width / 2,
        borderTopWidth: width / 2,
        borderBottomWidth: width / 2,
      }}
    ></div>
  );
};

export default Center;
