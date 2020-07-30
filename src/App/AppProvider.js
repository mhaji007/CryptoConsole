// State container

import React, {Component} from 'react';

import _ from 'lodash';

const cc = require('cryptocompare');

//cc.setApiKey('<-api-key>')

const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends Component {

    setPage = page => this.setState({page})

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})
    
    // Overwrites some state properties
    // based on whether there is data
    // in local storage or not
    savedSettings(){
        // return first visit variables
        let cryptoConsoleData = JSON.parse(localStorage.getItem('cryptoConsole'));

         
        if(!cryptoConsoleData) {
            
            return {page: 'settings', firstVisit: true}
            // We don't need to specify all the variables
            // in the default state. You can set them after the fact.
            //(e.g., firstVisit variable below)
        }

        let {favorites, currentFavorite} = cryptoConsoleData;

        return {favorites, currentFavorite};
    }

    
  setCurrentFavorite = (sym) => {
    this.setState({
      currentFavorite: sym,
    });

    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
  }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
    }

    fetchCoins = async () => {
        // .Data returns just the coins
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        if(this.state.firstVisit) return;
        let prices = await this.prices();
        // Filter the empty price objects
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices});
      }

      prices = async () => {
        let returnData = [];
        for(let i = 0; i < this.state.favorites.length; i++){
          try {
            let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
            returnData.push(priceData);
          } catch (e){
            console.warn('Fetch price error: ', e);
          }
        }
        return returnData;
      }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES){
          favorites.push(key);
          this.setState({favorites});
        }
      }
    
      removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
      }
    
      isInFavorites = key => _.includes(this.state.favorites, key);

    
    confirmFavorites = ()=>{
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
        }, () => {
            this.fetchPrices();});

        localStorage.setItem('cryptoConsole', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
        }));
    }
    
    // page defaults to dashboard
    // unless there is no local storage data
    // in that case user is forwarded
    // to settings page
    state = {
        page: 'dashboard',
        favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
        ...this.savedSettings(),
        setPage: this.setPage,  //page => this.setState({page}),
        addCoin: this.addCoin,
        removeCoin: this.removeCoin,
        isInFavorites: this.isInFavorites,
        confirmFavorites: this.confirmFavorites,
        setCurrentFavorite: this.setCurrentFavorite,
        setFilteredCoins: this.setFilteredCoins
    }
    

    render() { 
        return ( 
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
         );
    }
}
 

