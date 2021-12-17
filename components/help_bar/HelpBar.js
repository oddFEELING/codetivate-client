import React from 'react';
import styles from './helpbar.module.scss';

const HelpBar = () => {
  const Lottiestyle = {
    width: '50%',
    height: '50%',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '-5%',
    right: 0,
  };
  return (
    <section className={styles.container}>
      <h1>Help bar</h1>
      <lottie-player
        src='https://assets4.lottiefiles.com/packages/lf20_xh83pj1c.json'
        background='transparent'
        speed='.75'
        style={Lottiestyle}
        loop
        autoplay
      ></lottie-player>
    </section>
  );
};

export default HelpBar;
