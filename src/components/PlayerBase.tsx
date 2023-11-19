import { Color, ColorShade } from '../types';
import { getColor } from '../utils';

interface PlayerBaseProps {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
  color: Color;
}

const PlayerBase: React.FC<PlayerBaseProps> = ({
  vertical,
  horizontal,
  color,
}) => {
  const verticalClasses =
    vertical === 'top' ? 'row-span-6' : 'row-start-10 row-span-6';
  const horizontalClasses =
    horizontal === 'left' ? 'col-span-6' : 'col-start-10 col-span-6';
  const colorClass = `bg-${getColor(color, ColorShade.NORMAL)}`;

  let borderClasses;

  if (vertical === 'top' && horizontal === 'left') {
    borderClasses = 'border-r-2 border-b-2';
  } else if (vertical === 'top' && horizontal === 'right') {
    borderClasses = 'border-l-2 border-b-2';
  } else if (vertical === 'bottom' && horizontal === 'right') {
    borderClasses = 'border-l-2 border-t-2';
  } else if (vertical === 'bottom' && horizontal === 'left') {
    borderClasses = 'border-r-2 border-t-2';
  }

  return (
    <div
      className={`${verticalClasses} ${horizontalClasses} ${colorClass} ${borderClasses} border-black`}
    >
      PlayerBase
    </div>
  );
};

export default PlayerBase;
