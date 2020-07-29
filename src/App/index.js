import React, {Component} from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings';
import Dashboard from '../Dashboard'
import Content from '../Shared/Content.js'

// import styled, {css} from 'styled-components';

// // create a div named MyButton
// // styled it with color green
// // if MyButton is passed a props
// // and if this props is named primary
// // apply css rule that follows
// const MyButton = styled.div`
//   color:green;
//   ${props => props.primary && css`
//   color: palevioletred;
//   `}
// `
// // below component TomatoButton will
// // be of type MyButton and will inherit
// // all the styles defined therein
// // and can overwrite these styles
// // with its own set of rules
// const TomatoButton = styled(MyButton)`
//   color: tomato;
//   border-color: tomato;
// `;

// ==================================================================

// Below goes inside return in render

{/* <MyButton> Hello from non-primary! </MyButton>
<MyButton primary={"0"}> Hello from primary! </MyButton>
<TomatoButton primary={"0"}> Hello from primary! </TomatoButton> */}

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar/>
          <Content>
            <Settings />
            <Dashboard />
          </Content>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
