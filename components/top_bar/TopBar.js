import React from 'react';
import Image from 'next/image';
import Router from 'next/router';
import styles from './topbar.module.scss';
import { useSelector } from 'react-redux';
import ProfileIcon from '../../assets/icons/profile_icon.svg';
import AllIcon from '../../assets/icons/all_inv.svg';
import StockIcon from '../../assets/icons/stocks.svg';
import ForexIcon from '../../assets/icons/forex.svg';
import CryptoIcon from '../../assets/icons/crypto.svg';
import analysisIcon from '../../assets/icons/analysis_icon.svg';
import LogIcon from '../../assets/icons/log_icon.svg';

const TopBar = () => {
  const User = useSelector((state) => state.user.value);

  //-->  handle log out
  const handleLogout = () => {
    localStorage.removeItem('UserToken');
    Router.push('/');
  };
  return (
    <div className={styles.container}>
      {/* ----- profile box ----- */}
      <section className={styles.profile__section}>
        <div className={styles.profile__icon}>
          <Image src={ProfileIcon} alt='' layout='fill' />
        </div>
        <p>
          Welcome <b>{User.firstname}</b>
        </p>
      </section>

      {/* ----- ALl investmets ----- */}
      <section className={styles.icon__section}>
        <div className={styles.icon__icon}>
          <Image src={AllIcon} alt='' layout='fill' />
        </div>
        <p>Investments</p>
      </section>

      {/* ----- stocks section ----- */}
      <section className={styles.icon__section}>
        <div className={styles.icon__icon}>
          <Image src={StockIcon} alt='' layout='fill' />
        </div>
        <p>Stocks</p>
      </section>

      {/* ----- crypto section ----- */}
      <section className={styles.icon__section}>
        <div className={styles.icon__icon}>
          <Image src={CryptoIcon} alt='' layout='fill' />
        </div>
        <p>Crypto</p>
      </section>

      {/* ----- forex section ----- */}
      <section className={styles.icon__section}>
        <div className={styles.icon__icon}>
          <Image src={ForexIcon} alt='' layout='fill' />
        </div>
        <p>Forex</p>
      </section>

      {/* ----- analysis section ----- */}
      <section className={styles.icon__section}>
        <div className={styles.icon__icon}>
          <Image src={analysisIcon} alt='' layout='fill' />
        </div>
        <p>Analysis</p>
      </section>

      {/* ----- logout section ----- */}
      <section
        className={`${styles.icon__section} ${styles.logout}`}
        onClick={handleLogout}
      >
        <div className={styles.icon__icon}>
          <Image src={LogIcon} alt='' layout='fill' />
        </div>
        <p>Logout</p>
      </section>
    </div>
  );
};

export default TopBar;
