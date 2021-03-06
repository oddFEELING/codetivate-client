import React, { useEffect, useState, useRef } from 'react';
import Card from '../inv_card_item/Card';
import styles from './console.module.scss';
import axios from 'axios';
import { set_investment } from '../../features/user';
import { useSelector, useDispatch } from 'react-redux';
import CardDetail from '../card_detail/CardDetail';

const Console = () => {
  const dispatch = useDispatch();
  const [Info, setInfo] = useState(false);
  const [Position, setPosition] = useState(0);
  const User = useSelector((state) => state.user.value);
  const formRef = useRef();
  const [Add, setAdd] = useState('false');

  // initial invetsment data
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
    left: 0,
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
            console.log(res.data.data);
            dispatch(set_investment(res.data.data));
          })
          .catch((err) => {
            console.log(`Error getting data --> ${err}`);
          });
      } catch (err) {
        throw err;
      }
    })();
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

    // check for empty field
    if (
      InvestData.investment_type !== '' &&
      InvestData.invested_amount !== 0 &&
      InvestData.ticker_name !== '' &&
      InvestData.quantity !== 0
    ) {
      try {
        await axios
          .post(
            'https://codetivate-backend.herokuapp.com/_api/user/add_investment',
            {
              id: User.id,
              data: { ...InvestData },
            }
          )
          .then((res) => {
            console.log(res.data.data.investments);
            dispatch(set_investment(res.data.data.investments));
          })
          .catch((err) => {
            console.log(`Error adding data ---> ${err}`);
          });

        // close the overlay
        setAdd('false');

        // reset the object
        setInvestData({
          investment_type: '',
          ticker_name: '',
          quantity: 0,
          invested_amount: 0,
        });
        formRef.current.reset();
      } catch (err) {
        console.log(`Error adding inv: Error msg--> ${err}`);
        alert(`Error adding Investment. Check console for details`);
      }
    } else {
      alert('Please fill all fields');
    }
  };
  return (
    <section className={styles.container}>
      {!Info ? (
        <>
          <lottie-player
            src='https://assets3.lottiefiles.com/packages/lf20_f6zszxrn.json'
            background='transparent'
            speed='.7'
            onClick={showForm}
            style={LottieStyle}
            loop
            hover
          ></lottie-player>

          <button>Update List</button>
          {User.investments.length > 0 ? (
            User.investments.map((data, index) => {
              return (
                <Card
                  key={index}
                  onClick={() => {
                    setInfo(true);
                    setPosition(index);
                  }}
                  pos={index}
                  quantity={data.quantity}
                  investment_type={data.investment_type}
                  ticker_name={data.ticker_name}
                  invested_amount={data.invested_amount}
                />
              );
            })
          ) : (
            <h1>No Data</h1>
          )}
          {/* ----- Add invetment card ----- */}
          <form className={styles.add__form} ref={formRef} add={Add}>
            <p onClick={() => setAdd('false')}>X Close</p>
            <h1>Add new Investment</h1>
            {/* ----- investment type ----- */}
            <input
              type='text'
              required
              onChange={setData('investment_type')}
              placeholder='Investment type'
              className={styles.form__input}
            />

            {/* ----- ticker name ----- */}
            <input
              type='text'
              required
              placeholder='Ticker name'
              onChange={setData('ticker_name')}
              className={styles.form__input}
            />

            {/* ----- Quantity ----- */}
            <input
              type='number'
              required
              onChange={setData('quantity')}
              placeholder='Quantity of investment'
              className={styles.form__input}
            />

            {/* ----- Invested amount ----- */}
            <input
              type='number'
              required
              onChange={setData('invested_amount')}
              placeholder='Amount invested'
              className={styles.form__input}
            />

            {/* ----- add button ----- */}
            <button className={styles.form__btn} onClick={handleInvestment}>
              Add investment
            </button>
          </form>
        </>
      ) : (
        <>
          <CardDetail
            onClick={() => setInfo(false)}
            tckr_name={User.investments[Position].ticker_name}
            inv_type={User.investments[Position].investment_type}
          />
        </>
      )}
    </section>
  );
};

export default Console;
