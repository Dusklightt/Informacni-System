import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import queryString from "query-string";
import axios from 'axios';
import PersonnelListItem from './Items/PersonnelListItemForTransfer.js';

export default class TransferRecords extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { id: "", doctors: [] };
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_doctors" });
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
                    self.setState({ doctors: data });
                  }
                }
            );
  }

  changeRole(){
      var params = queryString.stringify({ type: "change_role", UID: this.props.match.params.id, role: this.props.match.params.role, is_doctor: 1, accepted_offer: 1, transfer_to: this.state.id });
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
                    self.props.history.push("/users");
                  }
                }
            );
  }

  deleteUser(){
      var self = this;
      var params = queryString.stringify({ type: "delete_user", UID: this.props.match.params.id, accepted_offer: 0, transfer_to: this.state.id });
      axios.post("http://www.stud.fit.vutbr.cz/~xstafl01/router.php", params)
            .then(function(response) {
                  var data = response.data;
                  if(response.statusText != "OK" || response.status != 200)
                  {
                    //ERROR
                  }
                  else
                  {
                    self.props.history.push("/users");
                  }
                }
            );
  }


  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.match.params.role == 0){
      this.deleteUser();
    }
    else{
      this.changeRole();
    }
  }

  render() {
    var personnellist = this.state.doctors.map((item, i) =>
    (
      <PersonnelListItem data={item} key={i}/>
    ));

    return(
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="input-group">
                <label>ID doktora</label>
                <input type ="text" name="id" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="input-group">
                <button type="submit" name="login" className="btn">Převést</button>
            </div>
        </form>
        <div class="main">
          <label className="recordsLabel">Personál</label>
          <div className="recordList">
            <div className="recordListHeader">
                <div class="row">
                    <div class="column">
                        ID
                    </div>
                    <div class="column">
                        Jméno
                    </div>
                    <div class="column">
                        Příjmení
                    </div>
                </div>

            </div>
            {personnellist}
          </div>
        </div>
      </div>
    );
  }
}
