import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './carddetail.module.scss';
import { useSelector } from 'react-redux';
import { ResponsivePie } from 'nivo/lib/components/charts/pie';
import PieChart from './PieChart';

const CardDetail = (props) => {
  const [PieData, setPieData] = useState([]);
  const [TotalInvestment, setTotalInvestment] = useState(0);
  const { tckr_name, inv_type, crnt_price, onClick } = props;
  const InvestmentPrice = useSelector((state) => state.user.value.inv_prc);
  const UserInvestments = useSelector((state) => state.user.value.investments);
  const pos = useSelector((state) => state.user.value.position);
  console.log(UserInvestments[pos]);

  //-->
  const getReturns = () => {
    const value =
      Number(UserInvestments[pos].quantity) * Number(InvestmentPrice) -
      Number(UserInvestments[pos].invested_amount);

    return value;
  };
  return (
    <div className={styles.container}>
      {/* ----- back button ----- */}
      <button onClick={onClick}>Back</button>
      {/* ----- top section ----- */}
      <section className={styles.top__section}>
        {/* ----- chart area ----- */}
        <section className={styles.chart__area}>
          {/* ----- ticker name area ----- */}
          <div className={styles.ticker__area}>
            <h1>{tckr_name}</h1>
            <h3> {InvestmentPrice ? `$ ${InvestmentPrice}` : 'loading...'}</h3>
          </div>

          {/* ----- main analysis ----- */}
          <section className={styles.analysis__section}>
            <h2>😊Analysis coming soon...</h2>
          </section>
        </section>

        {/* ----- chart box ----- */}
        <section className={styles.pie__part}>
          <section className={styles.pie__chart}>
            <PieChart />
          </section>
          <div className={styles.info__sect}>
            {/* ----- current price ----- */}
            <h2 onClick={() => console.log(InvestmentPrice)}>
              Current price: <b>$ {Number(InvestmentPrice).toFixed(2)}</b>
            </h2>

            {/* ----- invested amount ----- */}
            <h2>
              Invested Amount:
              <b>
                {' '}
                {UserInvestments[pos]
                  ? ` $ ${Number(UserInvestments[pos].invested_amount).toFixed(
                      2
                    )}`
                  : 'loading...'}
              </b>
            </h2>

            {/* ----- quntity purchased ----- */}
            <h2>
              Quantity purchased:
              <b>
                {UserInvestments[pos]
                  ? ` ${Number(UserInvestments[pos].quantity)}`
                  : 'loading...'}
              </b>
            </h2>

            {/* ----- expected return ----- */}
            <h2>
              Expected return:
              <b>
                {UserInvestments[pos]
                  ? ` $ ${getReturns().toFixed(2)}`
                  : 'loading...'}
              </b>
            </h2>
          </div>
        </section>
      </section>

      {/* ----- card section ----- */}
      <section>Bottom</section>
    </div>
  );
};

export default CardDetail;
