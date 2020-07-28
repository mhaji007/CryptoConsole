// State container

import React, {Component} from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends Component {
    
    // Overwrites some state properties
    // based on whether there is data
    // in local storage or not
    savedSettings(){
        // return first visit variables
        let cryptoConsoleData = JSON.parse(localStorage.getItem('cryptoConsole'));
        if(!cryptoConsoleData) {
            
            // We don't need to specify all the variables
            // in the default state. You can set them after the fact.
            //(e.g., firstVisit variable below)
            return{page:'settings', firstVisit: true}
        }

        return {}
    }

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        // .Data returns just the coins
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        //console.log(coinList);
    }
    
    confirmFavorites = ()=>{
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });

        localStorage.setItem('cryptoConsole', JSON.stringify({
            test: 'hello'
        }));
    }
    
    // page defaults to dashboard
    // unless there is no local storage data
    // in that case user is forwarded
    // to settings page
    state = {
        page: 'dashboard',
        ...this.savedSettings(),
        setPage:  page => this.setState({page}),
        confirmFavorites: this.confirmFavorites
    }
    

    render() { 
        return ( 
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
         );
    }
}
 