import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class About extends React.Component {
  constructor()
  {
    super();
    this.state = {};
  }

  componentDidMount(){
    if(localStorage.getItem('LoggedIn') != -1){
      window.location.reload(false);
      localStorage.setItem('LoggedIn', -1);
    }
  }

  render() {

    return(
      <div className="main">
        <label className="About"><Link to={'/login'} className="nav-link">Login</Link> required</label>
      </div>
    );
  }
}
