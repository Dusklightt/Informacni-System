import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class TopBar extends React.Component {
  constructor()
  {
    super();
    this.state = { role : -1 };
  }

  logout(){
      //localStorage.setItem('LoggedIn', -1);
      this.setState({ role: -1 });
  }

  componentDidMount(){
      this.setState({ role: localStorage.getItem('LoggedIn'), userID: localStorage.getItem('userID') })
      if (localStorage.getItem('LoggedIn') != 0 && localStorage.getItem('LoggedIn') != 1 && localStorage.getItem('LoggedIn') != 2 && localStorage.getItem('LoggedIn') != 3){
        localStorage.setItem('LoggedIn', -1);
      }
  }

  render() {
    return(
  			<div className="topBar">
  				<div className="userBox">
  					{ ((localStorage.getItem('LoggedIn') == 0) || (localStorage.getItem('LoggedIn') == 1) || (localStorage.getItem('LoggedIn') == 2) || (localStorage.getItem('LoggedIn') == 3)) && <Link to={'/editProfile/'+this.state.userID} className="userBoxName">{localStorage.getItem('userName')} {localStorage.getItem('userSurname')}  </Link> }

            { ((localStorage.getItem('LoggedIn') == 0) || (localStorage.getItem('LoggedIn') == 1) || (localStorage.getItem('LoggedIn') == 2) || (localStorage.getItem('LoggedIn') == 3)) && <Link to={'/login'} className="logoutBtn" onClick={this.logout.bind(this)}>Odhlásit</Link> }


            { ((localStorage.getItem('LoggedIn') != 0) && (localStorage.getItem('LoggedIn') != 1) && (localStorage.getItem('LoggedIn') != 2) && (localStorage.getItem('LoggedIn') != 3)) && <Link to={'/login'} className="loginBtn">Log In</Link> }
  				</div>
  			</div>
    );
  }
}
