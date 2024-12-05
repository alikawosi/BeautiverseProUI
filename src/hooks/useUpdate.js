import {useRef, useEffect} from 'react';

const useUpdate = (callback, deps = []) => {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
};

export {useUpdate};
