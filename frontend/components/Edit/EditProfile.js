import React from "react";

import queryString from "query-string";
import axios from 'axios';

export default class EditProfile extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {  password: "",
                    email: "",
                    name: "",
                    surname: "",
                    sex: "",
                    phone: "",
                    birth: "",
                    address: "",
                    newPassword: "",
                    confirmPassword: "",
                  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitDetails = this.handleSubmitDetails.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_user", UID: this.props.match.params.id });
      var self = this;
      axios.post("http://www.stud.fit.vutbr.cz/~xstafl01/router.php", params)
            .then(function(response) {
                  var data = response.data[0];
                  if(response.statusText != "OK" || response.status != 200)
                  {
                    //ERROR
                  }
                  else
                  {
                    self.setState({ email: data.email,
                                    name: data.name,
                                    surname: data.surname,
                                    sex: data.sex,
                                    phone: data.phone,
                                    birth: data.birth,
                                    address: data.address
                                   });
                  }
                }
            );
  }

  editUser(){
      var params = queryString.stringify({ type: "edit_user", UID: this.props.match.params.id, password: this.state.password, email: this.state.email, name: this.state.name, surname: this.state.surname, sex: this.state.sex, phone: this.state.phone, birth: this.state.birth, address: this.state.address });
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
                      window.location.reload(false);
                    }
                    else{
                      alert(response.data);
                    }
                    //SUCCESS
                  }
                }
            );
  }

  editPassword(){
      var params = queryString.stringify({ type: "edit_user", UID: this.props.match.params.id, password: this.state.password, newpassword: this.state.newPassword });
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
                      window.location.reload(false);
                    }
                    else{
                      alert(response.data);
                    }
                    //success
                  }
                }
            );
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmitDetails(event) {
    event.preventDefault();
    this.editUser();
  }

  handleSubmitPassword(event) {
    event.preventDefault();
    if (this.state.newPassword === this.state.confirmPassword){
      this.editPassword();
    }
  }

  render() {
    return(
  			<div className="editProfile">
          <div className="editChangeDetails">
            <div className="editHeader">
                <label>Upravit profil</label>
            </div>
            <form className="editForm" onSubmit={this.handleSubmitDetails}>
                <div className="editInputGroup">
                    <label>Email</label>
                    <input type ="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Name</label>
                    <input type ="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Surname</label>
                    <input type ="text" name="surname" value={this.state.surname} onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Sex</label>
                    <input type ="text" name="sex" value={this.state.sex} onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Phone</label>
                    <input type ="text" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Date of birth</label>
                    <input type ="text" name="birth" value={this.state.birth} onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Confirm password</label>
                    <input type ="text" name="password" onChange={this.handleChange}/>
                </div>
                <div className="editBtnContainer">
                    <button type="submit" name="edit" className="editBtn">Save</button>
                </div>
            </form>
          </div>

          <div className="editChangePassword">
            <form className="editForm" onSubmit={this.handleSubmitPassword}>
                <div className="editLabel"><label>Change Password</label></div>
                <div className="editInputGroup">
                    <label>Current password</label>
                    <input type ="text" name="password" onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>New password</label>
                    <input type ="text" name="newPassword" onChange={this.handleChange}/>
                </div>
                <div className="editInputGroup">
                    <label>Confirm password</label>
                    <input type ="text" name="confirmPassword" onChange={this.handleChange}/>
                </div>
                <div className="editBtnContainer">
                    <button type="submit" name="edit" className="editBtn">Change</button>
                </div>
            </form>
          </div>
  			</div>
    );
  }
}
