import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import configureStore from "@/store/configureStore";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

const store = configureStore();
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}

export default App;