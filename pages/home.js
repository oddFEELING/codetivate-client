import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const User = useSelector((state) => state.user.value);
  return (
    <div>
      <h1>Welcome home {User.firstname}</h1>
    </div>
  );
};

export default Home;
