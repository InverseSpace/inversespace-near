
import { Network, Wallet, Chain } from 'mintbase';
import { start } from 'node:repl';
import React, { useState } from 'react';
import { useEffect, useContext, createContext, FC, ReactNode } from 'react';


export const  MintbaseCollectionContext = createContext({});


export const MintbaseCollectionProvider = (props) => {
    const { storeName, children } = props;
    const [collectionStore, setCollectionStore] = useState([]);

    const storeUrl = `https://mintbase-testnet.hasura.app/api/rest/stores/${storeName}.mintspace1.testnet`

    const metadataItems = async (arr) => {
        let results = []
        for(let item of arr) {
            let response = await fetch(item.sourceURL)
            const metadata = await response.json();
            results.push({...item, ...metadata})
            
        }
        return results;
    }


    const initStore = () => {
        fetch(storeUrl)
        .then(response => response.json())
        .then(json=>json.store[0])
        .then(({name: storeName, symbol: storeSymbol, baseUri, id, things}) =>
            things.map(z=>({
                id,
                storeName,
                storeSymbol,
                sourceURL: baseUri+"/"+z.metaId
            }))
        )
        .then(items => metadataItems(items))
        .then(finalItems => {
            setCollectionStore(finalItems)
        })
    }

    useEffect(() => { initStore() },[storeName])

    return (
        <MintbaseCollectionContext.Provider value={{ store: collectionStore }}>
            {children}
        </MintbaseCollectionContext.Provider>
    )
}