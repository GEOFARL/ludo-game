import { Color, ColorShade } from '../types';
import { getColor } from '../utils';

interface CellProps {
  color: Color;
  classes?: string;
}

const Cell: React.FC<CellProps> = ({ color, classes }) => {
  return (
    <div
      className={`bg-${getColor(
        color,
        ColorShade.NORMAL
      )} ${classes} border-black`}
    ></div>
  );
};

export default Cell;
