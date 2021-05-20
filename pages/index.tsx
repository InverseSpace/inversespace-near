import {  useContext } from "react";
// import "./App.css";
// import Header from "../components/Header"
import styled from 'styled-components'
import { Wallet, Chain, Network } from "mintbase";
import { WalletContext } from "../hooks/WalletProvider";
import BasicGallery from "../components/BasicGallery";

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


export default function Home(props) {
  const { wallet, isConnected, details } = useContext(WalletContext);

  const handleConnect = async (shouldRequest: boolean) => {
    if (!wallet) return;
    await wallet.connect({ requestSignIn: shouldRequest || false });
  };

  const handleDisconnect = () => {
    if (!wallet) return;
    wallet.disconnect();
    window.location.reload();
  };

  return (
    <Container>
      <Header>
        <HeaderRight>
          {isConnected && details && (
              <>
              <Details>Account: {details?.accountId}</Details>
              <Details>Balance: {details?.balance} N</Details>
              </>
          )}
          <ButtonsContainer>
            {!isConnected && (
              <Button onClick={() => handleConnect(true)}>Connect</Button>
            )}
            {isConnected && (
              <Button onClick={() => handleDisconnect()}>Disconnect</Button>
            )}
          </ButtonsContainer>
        </HeaderRight>
      </Header>
      <BasicGallery />
    </Container>
  )

}
