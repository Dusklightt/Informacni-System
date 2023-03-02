import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import queryString from "query-string";
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { username: "",
                   password: "",
                   loggedIn: false,
                   role: 0,
                 };
  }

  componentDidMount(){
    if(localStorage.getItem('LoggedIn') != -1){
      window.location.reload(false);
      localStorage.setItem('LoggedIn', -1);
    }
  }

  loginUser(){
      var params = queryString.stringify({ type: "login", username: this.state.username, password: this.state.password });
      var self = this;

      axios.post("http://www.stud.fit.vutbr.cz/~xstafl01/router.php", params)
            .then(function(response) {
                  var data = response.data;
                  if(response.statusText != "OK" || response.status != 200)
                  {
                    //ERROR
                  }
                  else
                  {
                    //success

                    if (data.success === true){
                      localStorage.setItem('LoggedIn', data.role);
                      localStorage.setItem('userName', data.name);
                      localStorage.setItem('userSurname', data.surname);
                      localStorage.setItem('userID', data.user_id);
                      if(data.role == 3){
                        self.props.history.push("/insurance");
                      }
                      else{
                        self.props.history.push("/records");
                      }
                      window.location.reload(false);
                    }
                  }
                }
            );
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    //todo osetrit password a tak
    event.preventDefault();
    this.loginUser();
  }

  render() {

    return(
      <div className="main">
        <div>
            <h2>Login</h2>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="input-group">
                <label>Username</label>
                <input type ="text" name="username" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="input-group">
                <label>Password</label>
                <input type ="text" name="password" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="input-group">
                <button type="submit" name="login" className="editBtn">Login</button>
            </div>
            <p>
                Not registered yet? <Link to={'./register'} className="nav-link">Sign in</Link>
            </p>
        </form>
      </div>
    );
  }
}
