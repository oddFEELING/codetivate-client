import React, { useEffect, useState, useRef } from 'react';
import Card from '../inv_card_item/Card';
import styles from './console.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Console = () => {
  const User = useSelector((state) => state.user.value);
  const formRef = useRef();
  const [Add, setAdd] = useState('false');
  const [UserInvestment, setUserInvestment] = useState([]);
  const [InvestData, setInvestData] = useState({
    investment_type: '',
    ticker_name: '',
    quantity: 0,
    invested_amount: 0,
  });

  const LottieStyle = {
    width: '10%',
    height: '15%',
    cursor: 'pointer',
    position: 'absolute',
    right: 0,
    bottom: '2%',
    zIndex: 5,
  };

  //-->  Fetch User info
  useEffect(() => {
    (async function () {
      try {
        await axios
          .post(
            'https://codetivate-backend.herokuapp.com/_api/user/get_investment',
            { id: User.id }
          )
          .then((res) => {
            console.log(res);
            setUserInvestment(res.data);
          })
          .catch((err) => {
            console.log(`Errorgetting data --> ${err}`);
          })();
      } catch (err) {
        throw err;
      }
    });
  }, []);

  //-->  set data
  const setData = (value) => (event) => {
    setInvestData({
      ...InvestData,
      [value]: event.target.value,
    });
  };

  //-->  show add form
  const showForm = () => {
    setAdd('true');
  };

  //-->  addv investment
  const handleInvestment = async (event) => {
    event.preventDefault();
    await axios
      .post(
        'https://codetivate-backend.herokuapp.com/_api/user/add_investment',
        {
          id: User.id,
          data: { ...InvestData },
        }
      )
      .then((res) => {
        console.log(res);
        setUserInvestment(res.data);
      })
      .catch((err) => {
        console.log(`Error adding data ---> ${err}`);
      });
  };
  return (
    <section className={styles.container}>
      <lottie-player
        src='https://assets3.lottiefiles.com/packages/lf20_f6zszxrn.json'
        background='transparent'
        speed='.7'
        onClick={showForm}
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
        invested_amount='20000'
      />
      <Card
        quantity='422'
        investment_type='Crpto'
        ticker_name='TSLA'
        invested_amount='1000'
      />
      {/* ----- Add invetment card ----- */}
      <form className={styles.add__form} ref={formRef} add={Add}>
        <p onClick={() => setAdd('false')}>X Close</p>
        <h1>Add new Investment</h1>
        {/* ----- investment type ----- */}
        <input
          type='text'
          onChange={setData('investment_type')}
          placeholder='Investment type'
          className={styles.form__input}
        />

        {/* ----- ticker name ----- */}
        <input
          type='text'
          placeholder='Ticker name'
          onChange={setData('ticker_name')}
          className={styles.form__input}
        />

        {/* ----- Quantity ----- */}
        <input
          type='number'
          onChange={setData('quantity')}
          placeholder='Quantity of investment'
          className={styles.form__input}
        />

        {/* ----- Invested amount ----- */}
        <input
          type='number'
          onChange={setData('invested_amount')}
          placeholder='Amount invested'
          className={styles.form__input}
        />

        {/* ----- add button ----- */}
        <button className={styles.form__btn} onClick={handleInvestment}>
          Add investment
        </button>
      </form>
    </section>
  );
};

export default Console;
