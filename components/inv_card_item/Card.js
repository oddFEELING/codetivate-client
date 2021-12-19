import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './card.module.scss';

const Card = (props) => {
  const [CurrentAmount, setCurrentAmount] = useState(0);
  const { investment_type, ticker_name, quantity, invested_amount } = props;

  //-->  get live price
  const handlePrice = async () => {
    try {
      if (investment_type == 'crypto') {
        // get crypto price
        await axios
          .get(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${ticker_name}&to_currency=USD&apikey=D2CBT4GVGUAP51HW`
          )
          .then((res) => {
            const rawData = res.data['Realtime Currency Exchange Rate'];
            setCurrentAmount(rawData['5. Exchange Rate']);
          });
      }
      // get stocks price
      else if (investment_type == 'stocks') {
        await axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker_name}&apikey=D2CBT4GVGUAP51HW`
          )
          .then((res) => {
            const Data = res.data['Time Series (Daily)'];
            const DataArray = Object.entries(Data);
            setCurrentAmount(DataArray[0][1]['4. close']);
          });
      }
      // get forex price
      else if (investment_type == 'forex') {
        await axios
          .get(
            `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${ticker_name}&to_symbol=USD&apikey=D2CBT4GVGUAP51HW`
          )
          .then((res) => {
            const Data = res.data['Time Series FX (Daily)'];
            const DataArray = Object.entries(Data);
            setCurrentAmount(DataArray[0][1]['4. close']);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
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
        <div className={styles.current__div}>
          <p>{ticker_name}</p>
          <p>
            <b>$</b> {Number(CurrentAmount).toFixed(4)}
          </p>
        </div>
      </span>

      {/* ----- quantity ----- */}
      <span className={styles.item__section}>
        <h1>Quantity</h1>
        <p>{quantity}</p>
      </span>

      {/* ----- amount ----- */}
      <span className={styles.item__section}>
        <h1>Inv Amount</h1>
        <p>
          <b>$</b> {invested_amount}
        </p>
      </span>

      {/* ----- price ----- */}
      <span className={styles.item__section} style={{ borderRight: 'none' }}>
        <h1>Current Amt</h1>
        <p>300</p>
      </span>

      <span className={styles.btn__area}>
        {/* ----- get button ----- */}
        <button className={styles.card__btn} onClick={handlePrice}>
          Get Price
        </button>

        {/* ----- delete investment ----- */}
        <button className={styles.card__btn} delete='true'>
          Delete
        </button>
      </span>
    </section>
  );
};

export default Card;
