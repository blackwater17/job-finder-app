import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import '../styles/globals.css';

import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'; // Adjust the path accordingly

const store = configureStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
