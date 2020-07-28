import React from 'react';
import {AppContext} from "../App/AppProvider";

// name is the prop passed at the component level
// page is page from the app state
export default function ({name, children}) {
  return <AppContext.Consumer>
    {({page}) => {
      if (page !== name) {
        return null;
      }
      return <div> {children} </div>;
    }}
  </AppContext.Consumer>;
}
