import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
import About from './About';
import letters from './Letters';
import diaries from './Diaries';
import './index.css';

const HomePage = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/Search">Search</Link></li>
        <li><Link to="/About">About</Link></li>

      </ul>

      <hr/>



      <Route exact path="/Search" component={App}/>
      <Route exact path="/About" component={About}/>
      <Route exact path="/letters/:_id" component={letters}/>
      <Route exact path="/diaries/:_id" component={diaries}/>
    </div>
  </Router>
)


ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
);
