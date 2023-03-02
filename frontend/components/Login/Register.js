import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import queryString from "query-string";
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      name: "",
      surname: "",
      sex: "",
      phone: "",
      birth: "",
      address: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  registerUser(){
      var params = queryString.stringify({ type: "user_insert", login: this.state.username, password: this.state.password, email: this.state.email, name: this.state.name, surname: this.state.surname, sex: this.state.sex, phone: this.state.phone, birth: this.state.birth, address: this.state.address });
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
                    if(response.data == "OK"){
                      self.props.history.push("/login");
                    }
                    else{
                      alert(response.data);
                    }
                  }
                }
            );
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.password == this.state.passwordConfirm){
      event.preventDefault();
      this.registerUser();
    }
  }

  render() {

    return(
      <div class="main">
        <div>
            <h2>Register</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
            <div class="input-group">
                <label>Username</label>
                <input type ="text" name="username" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Password</label>
                <input type ="text" name="password" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Confirm password</label>
                <input type ="text" name="passwordConfirm" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Name</label>
                <input type ="text" name="name" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Surname</label>
                <input type ="text" name="surname" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Email</label>
                <input type ="text" name="email" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Contact</label>
                <input type ="text" name="phone" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Date of birth</label>
                <input type ="text" name="birth" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <label>Address</label>
                <input type ="text" name="address" onChange={this.handleChange}/>
            </div>
            <div class="input-group">
                <button type="submit" name="register" class="editBtn">Register</button>
            </div>
            <p>
                Already registered? <Link to={'/login'} className="nav-link">Log in</Link>
            </p>
        </form>
      </div>
    );
  }
}
