import { Color, ColorShade } from '../types';

export function getColor(color: Color, shade: ColorShade) {
  switch (color) {
    case Color.RED: {
      switch (shade) {
        case ColorShade.LIGHT: {
          return 'red-400';
        }
        case ColorShade.NORMAL: {
          return 'red-500';
        }
        case ColorShade.DARK: {
          return 'red-700';
        }
      }
      break;
    }
    case Color.GREEN: {
      switch (shade) {
        case ColorShade.LIGHT: {
          return 'green-500';
        }
        case ColorShade.NORMAL: {
          return 'green-600';
        }
        case ColorShade.DARK: {
          return 'green-700';
        }
      }
      break;
    }
    case Color.YELLOW: {
      switch (shade) {
        case ColorShade.LIGHT: {
          return 'yellow-300';
        }
        case ColorShade.NORMAL: {
          return 'yellow-400';
        }
        case ColorShade.DARK: {
          return 'yellow-600';
        }
      }
      break;
    }
    case Color.BLUE: {
      switch (shade) {
        case ColorShade.LIGHT: {
          return 'blue-500';
        }
        case ColorShade.NORMAL: {
          return 'blue-600';
        }
        case ColorShade.DARK: {
          return 'blue-700';
        }
      }
      break;
    }
  }
}
