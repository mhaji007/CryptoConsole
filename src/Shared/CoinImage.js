import React from 'react';
import styled, {css} from 'styled-components';

export default function ({coin, style}) {
    return <img
    alt={coin.CoinSymbol}
    style={style || {height: '50px'}}
    src={`http://cryptocompare.com/${
        coin.ImageUrl
         }`}
    />;
}
