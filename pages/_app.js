import '../styles/globals.scss';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import UserReducer from '../features/user';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
