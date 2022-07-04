import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Web3Provider from 'web3-react';
import App from '../components/layouts/App';
import { connectors } from '../services/web3';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3Provider connectors={connectors} libraryName={'ethers.js'}>
        <App>
          <Component {...pageProps} />
        </App>
      </Web3Provider>
    </Provider>
  );
}

export default MyApp;
