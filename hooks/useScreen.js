import React, { useState, useLayoutEffect } from 'react';

const useScreen = () => {
  const [Mobile, seTMobile] = useState(false);
  useLayoutEffect(() => {
    function setScreen() {
      if (window.innerWidth < 800) {
        seTMobile(true);
      } else {
        seTMobile(false);
      }
    }

    window.addEventListener('load', setScreen);
    window.addEventListener('resize', setScreen);
    return () => {
      window.removeEventListener('load', setScreen);
      window.removeEventListener('resize', setScreen);
    };
  }, [Mobile]);

  return Mobile;
};

export default useScreen;
