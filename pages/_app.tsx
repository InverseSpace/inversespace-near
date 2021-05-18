import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { WalletProvider } from '../hooks/WalletProvider';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const withProviders = (...providers) => (WrappedComponent) => (props) =>
  providers.reduceRight((acc, prov) => {
    let Provider = prov;
    if (Array.isArray(prov)) {
      Provider = prov[0];
      return <Provider {...prov[1]}>{acc}</Provider>;
    }
    return <Provider>{acc}</Provider>;
  }, <WrappedComponent {...props} />);


const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default withProviders(
  [ThemeProvider, { theme }],
  [WalletProvider, { apiKey: "77ab9ca8-ed8c-4a62-8202-6c5075c9ef1e" }]
)(App)
