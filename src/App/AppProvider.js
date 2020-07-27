// State container

import React, {Component} from 'react';

export const AppContext = React.createContext();

export class AppProvider extends Component {

    state = {
         page: 'dashboard',
        setPage:  page => this.setState({page})
    }


    render() { 
        return ( 
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
         );
    }
}
 