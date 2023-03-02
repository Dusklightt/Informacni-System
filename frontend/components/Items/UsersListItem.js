import React from "react";

import queryString from "query-string";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class UsersListItem extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { role: this.props.data.role };
  }

  deleteHandle(){
    if(this.state.role == 1){
      if(window.confirm('Smazání lékaře. Převést záznamy na jiného lékaře?')){
        this.props.history.push("/transfer/"+this.props.data.user_id+'/'+0);
      }
      else{
        this.deleteUser();
      }
    }
    else{
      this.deleteUser();
    }
  }

  handleChange = (event) => {
    if (this.state.role == 1){
      if(window.confirm('Změna role lékaře. Převést záznamy na jiného lékaře?')){
        this.props.history.push("/transfer/"+this.props.data.user_id+'/'+event.target.value);
      }
      else{
        this.changeRole(event.target.value, 1, 0, 0);
      }
    }
    else{
      this.changeRole(event.target.value, 0, 0, 0);
    }
  };

  changeRole(value, isDoctor, acceptedOffer, transferID){
      var params = queryString.stringify({ type: "change_role", UID: this.props.data.user_id, role: value, is_doctor: isDoctor, accepted_offer: acceptedOffer, transfer_to: transferID });
      axios.post("http://www.stud.fit.vutbr.cz/~xstafl01/router.php", params)
            .then(function(response) {
                  var data = response.data;
                  if(response.statusText != "OK" || response.status != 200)
                  {
                    //ERROR
                  }
                  else
                  {
                    //success?
                  }
                }
            );
  }

  deleteUser(){
      var params = queryString.stringify({ type: "delete_user", UID: this.props.data.user_id });
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
                    self.props.delete(self.props.index);
                  }
                }
            );
  }

  render() {

    return(

      <div className="recordListItem">
          <div className="row">
              <div className="column">
                  {this.props.data.user_id}
              </div>
              <div className="column">
                  <Link to={'/EditProfile/'+this.props.data.user_id} className="nav-link">{this.props.data.name}</Link>
              </div>
              <div className="column">
                  {this.props.data.surname}
              </div>
              <div className="column">
                <select name="roles" id="roles" onChange={this.handleChange} defaultValue={this.state.role}>
                  <option value="2">Pacient</option>
                  <option value="1">Lékař</option>
                  <option value="3">Praconík pojišťovny</option>
                  <option value="0">Admin</option>
                </select>
              </div>

              <div className="column">
                  <button className="btn" onClick={this.deleteHandle.bind(this)}>Delete</button>
              </div>
          </div>
      </div>
    );
  }
}
