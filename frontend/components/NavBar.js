import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor()
  {
    super();
    this.state = { role: -1 };
  }

  componentDidMount(){
      this.setState({ role: localStorage.getItem("LoggedIn") })
  }

  render() {


    return(
      <div className="sideNav">
        <label>Nemocnice</label>
        <div className="sideNavButton">
          {this.state.role == -1 && <Link to={'/about'} className="nav-link">About</Link>}
          {(this.state.role == 0 || this.state.role == 1 || this.state.role == 2) && <Link to={'/records'} className="nav-link">Záznamy</Link>}
          {(this.state.role == 0 || this.state.role == 1) && <Link to={'/tickets'} className="nav-link">Tickety</Link>}
          {<Link to={'/personnel'} className="nav-link">Personál</Link>}
          {this.state.role == 0 && <Link to={'/users'} className="nav-link">Uživatelé</Link>}
          {(this.state.role == 3 || this.state.role == 0) && <Link to={'/insurance'} className="nav-link">Proplácení</Link>}
        </div>
      </div>
    );
  }
}
