import "@/styles/globals.css";
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

const store = configureStore();
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;