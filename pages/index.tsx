import { useEffect, useState } from "react";
// import "./App.css";
// import Header from "../components/Header"
import styled from 'styled-components'
import { Wallet, Chain, Network } from "mintbase";

const Header = styled.div`
  background: #333;
  color: #ddd;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr [l] 8fr [r] 8fr 1fr;
`

const HeaderRight = styled.div`
    grid-column-start: r;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Container = styled.div`
  text-align: center;
  max-width: 100vw;
`;


const ButtonsContainer = styled.div`
  display: inline-block;
`;

const Button = styled.button`
  height: 50px;
  margin: 10px;
`;

const Details = styled.p`
  font-size: 18px;
    display: inline-block;
    background: #070707;
    padding: 0.3em;
    margin: 2px;
`;


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] =
    useState<{
      accountId: string;
      balance: string;
      allowance: string;
      contractName: string;
    }>();
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const initWallet = async () => {
    const { data: walletData, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: "1deeae7f-a3cb-4479-9b18-f657e75ccc82",
    });

    if (error) {
      console.error(error);
    }

    const { wallet, isConnected } = walletData;

    if (isConnected) {
      try {
        const { data: details } = await wallet.details();

        setDetails(details);
      } catch (error) {
        console.log(error);
      }
    }

    setWallet(wallet);
    setIsLoggedIn(isConnected);
  };

  const handleConnect = async (shouldRequest: boolean) => {
    if (!wallet) return;
    await wallet.connect({ requestSignIn: shouldRequest || false });
  };

  const handleDisconnect = () => {
    if (!wallet) return;
    wallet.disconnect();
    window.location.reload();
  };

  useEffect(() => {
    initWallet();
  }, []);
  return (
    <Container>
      <Header>
        <HeaderRight>
          {isLoggedIn && details && (
              <>
              <Details>Account: {details?.accountId}</Details>
              <Details>Balance: {details?.balance} N</Details>
              </>
          )}
          <ButtonsContainer>
            {!isLoggedIn && (
              <Button onClick={() => handleConnect(true)}>Connect</Button>
            )}
            {isLoggedIn && (
              <Button onClick={() => handleDisconnect()}>Disconnect</Button>
            )}
          </ButtonsContainer>
        </HeaderRight>
      </Header>
    </Container>
  )

}
