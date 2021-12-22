import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './helpbar.module.scss';
import { Autoplay } from 'swiper';
import { useSelector } from 'react-redux';

const HelpBar = () => {
  const UserInvestments = useSelector((state) => state.user.value.investments);
  //-->  search value state
  const [SearchKey, setSearchKey] = useState('finance');
  //-->  news Object state
  const [News, setNews] = useState([]);

  //-->  effect to fetch news
  useEffect(() => {
    // code here...
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${SearchKey}&language=en&pageSize=100&apiKey=${process.env.NEWS_API}`
      )
      .then((res) => {
        setNews(res.data.articles);
      });
    keyHandler();
  }, [UserInvestments]);

  //-->  default options for slider component
  const sliderOptions = {
    direction: 'vertical',
    autoplay: true,
    parallax: true,
    loop: true,
    speed: 1500,
  };

  //-->  function to set search key

  function keyHandler() {
    if (UserInvestments.length > 0) {
      setInterval(() => {
        const random = Math.floor(Math.random() * UserInvestments.length);
        setSearchKey(UserInvestments[random].ticker_name);
      }, 20000);
    }
  }

  return (
    <section className={styles.container}>
      <Swiper
        className={styles.news__card}
        modules={[Autoplay]}
        {...sliderOptions}
      >
        {News.map((data, index) => {
          return (
            <SwiperSlide key={index} className={styles.slide__item}>
              <div
                id={styles.main__card}
                className={styles.main__card}
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.1),rgba(0,0,0,0.2),rgba(0,0,0,0.8), rgba(0,0,0,0.95)), url(${data.urlToImage})  no-repeat`,
                }}
              >
                {/* ----- Seacrch key ----- */}
                <p>
                  search key: <b>{SearchKey}</b>
                </p>
                {/* ----- news title ----- */}
                <h1>{data.title}</h1>
                <a href={data.url} target='_blank' rel='noreferrer'>
                  {data.source.name}
                </a>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default HelpBar;
