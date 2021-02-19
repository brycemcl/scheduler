import { useState } from 'react';
const useVisualMode = (initialMode) => {
  const [stack, setStack] = useState([initialMode]);
  const transition = (mode, replace = false) => {
    if (replace === true) {
      back();
    }
    setStack((p) => {
      return [...p, mode];
    });
  };
  const back = () => {
    setStack((p) => {
      if (p.length > 1) {
        return [...p].slice(0, -1);
      } else {
        return p;
      }
    });
  };

  return { mode: stack.slice(-1)[0], transition, back };
};

export default useVisualMode;
