import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom";

import './App.css';
import Homepage from "./pages/homepage/homepage.component"
import Header from './components/header/header.component';
import { MainContext } from './context/mainContext/mainContext';

function App() {

  const { token } = useContext(MainContext)

  return (
    <div className="App">
    {
      (token) ? <Header/> : null
    }
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
