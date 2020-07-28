import React from 'react';
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";

export const CoinGridStyled = styled.div`
  display: grid;   
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
  grid-gap: 15px; 
  margin-top: 40px; 
`


export default function (){
  return <AppContext.Consumer>
    {({coinList}) => 
      <CoinGridStyled>
        {Object.keys(coinList).map(coinKey => 
          <div> {coinKey} </div>
          )}
      </CoinGridStyled>}
  </AppContext.Consumer>
  
}
