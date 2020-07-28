import React from 'react';
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";
import {SelectableTile} from '../Shared/Tile';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;   
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
  grid-gap: 15px; 
  margin-top: 40px; 
`

function getCoinsToDisplay(coinList, topSection, favorites, filterCoins){
  return Object.keys(coinList).slice(0, 100);
}

export default function (){
  return <AppContext.Consumer>
    {({coinList}) => 
      <CoinGridStyled>
        {getCoinsToDisplay(coinList).map(coinKey =>
          <CoinTile coinKey={coinKey}/>
          )}
      </CoinGridStyled>}
  </AppContext.Consumer>
  
}
