import { Network, Wallet, Chain } from 'mintbase';
import React, { useState } from 'react';
import { useEffect, useContext, createContext, FC, ReactNode } from 'react';

interface IWalletProvider {
    network?: string;
    chain?: string;
    apiKey: string;
    children?: ReactNode;
}

interface IWalletConsumer {
    wallet?: any;
    isConnected?: boolean;
    details?: any;
}


export const WalletContext = createContext<{wallet: Wallet}>({});

export const WalletProvider = (props) => {
    const { network, chain, apiKey, children } = props;
    const [wallet, setWallet] = useState({});
    const [details, setDetails] = useState({});
    const [connected, setConnected] = useState(false);

    const initWallet = async () => {
        const { data: walletData, error } = await new Wallet().init({
            networkName: network | Network.testnet,
            chain: chain | Chain.near,
            apiKey: apiKey
        });

        if (error) {
            console.error(error);
            return;
        }

        const { wallet, isConnected } = walletData;
        setWallet(wallet);
        if (isConnected) {
            try {
                const { data: details } = await wallet.details();
                setDetails(details);
                setConnected(true);
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(
        () => {
            initWallet();
        }, [network]
    );

    return (
        <WalletContext.Provider value={{ wallet, details, isConnected: connected }}>
            { children }
        </WalletContext.Provider>
        
    )
}

export const withWallet = (Provider) => (Component) => (props) => (
  <Provider>
    <Component {...props} />
  </Provider>
)
