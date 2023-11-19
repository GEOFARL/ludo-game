import { useEffect, useRef, useState } from 'react';

export default function useWidth() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [boardWidth, setBoardWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getClientRects()[0];
      setBoardWidth(width);
    }
  }, [ref]);
  return {
    ref,
    width: boardWidth,
  };
}
