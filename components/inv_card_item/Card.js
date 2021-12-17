import React from 'react';
import styles from './card.module.scss';

const Card = (props) => {
  const { investment_type, ticker_name, quantity, invested_amount } = props;
  return (
    <section className={styles.container}>
      {/* ----- type ----- */}
      <span className={styles.item__section}>
        <h1>Type</h1>
        <p>{investment_type}</p>
      </span>

      {/* ----- ticker ----- */}
      <span className={styles.item__section}>
        <h1>Ticker Name</h1>
        <p>{ticker_name}</p>
      </span>

      {/* ----- quantity ----- */}
      <span className={styles.item__section}>
        <h1>Quantity</h1>
        <p>{quantity}</p>
      </span>

      {/* ----- amount ----- */}
      <span className={styles.item__section} style={{ borderRight: 'none' }}>
        <h1>Inv Amount</h1>
        <p>{invested_amount}</p>
      </span>
    </section>
  );
};

export default Card;
