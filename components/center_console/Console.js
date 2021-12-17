import React from 'react';
import Card from '../inv_card_item/Card';
import styles from './console.module.scss';

const Console = () => {
  const LottieStyle = {
    width: '10%',
    height: '15%',
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    bottom: '2%',
    zIndex: 5,
  };
  return (
    <section className={styles.container}>
      <lottie-player
        src='https://assets3.lottiefiles.com/packages/lf20_f6zszxrn.json'
        background='transparent'
        speed='.7'
        style={LottieStyle}
        loop
        hover
      ></lottie-player>
      <Card
        quantity='4'
        investment_type='Stocks'
        ticker_name='TSLA'
        invested_amount='1000'
      />
      <Card
        quantity='250'
        investment_type='Forex'
        ticker_name='TSLA'
        invested_amount='1000'
      />
      <Card
        quantity='422'
        investment_type='Crpto'
        ticker_name='TSLA'
        invested_amount='1000'
      />
    </section>
  );
};

export default Console;
