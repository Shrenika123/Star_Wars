import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, } from "react-router-dom";
import Person from "./pages/Person";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";

import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Router>
        <Switch>

          <Route path="/" exact component={HomePage}/>

          <Route path="/person/:id" component={Person}/>
          

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
