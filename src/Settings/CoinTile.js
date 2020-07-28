import React from 'react';
import {AppContext} from "../App/AppProvider";
import {SelectableTile, DisabledTile, DeletableTile} from "../Shared/Tile";
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage'


function clickCoinHandler(topSection, coinKey, addCoin, removeCoin){
  return topSection ? () => {
    removeCoin(coinKey)
  } : () => {
    addCoin(coinKey)
  }
}

export default function({coinKey, topSection}){
  
  
  return <AppContext.Consumer>
    {({coinList}) => {
      let coin = coinList[coinKey];
      const TileClass = SelectableTile;
      return <TileClass>
        <CoinHeaderGrid name= {coin.CoinName} symbol={coin.Symbol}/>
        <CoinImage coin = {coin}/>
        </TileClass>
    }}
  </AppContext.Consumer>
}
