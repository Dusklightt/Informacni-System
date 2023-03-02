import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import queryString from "query-string";
import axios from 'axios';
import PersonnelListItem from '../Items/PersonnelListItemForTransfer.js';

export default class AddTicket extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      doctors: [],
      type: "",
      examination_date: "",
      examiner_id: "",
      ticket_info: ""};
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

  addTicket(){
      var params = queryString.stringify({ type: "create_ticket", record_id: this.props.match.params.id, doctor_id: this.props.match.params.doctor_id, examiner_id: this.state.examiner_id, ticket_type: this.state.type, ticket_info: this.state.ticket_info, examination_date: this.state.examination_date });
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
                      self.props.history.push("/EditRecord/"+self.props.match.params.id);
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
    event.preventDefault();
    this.addTicket();
  }


  render() {

    var personnellist = this.state.doctors.map((item, i) =>
    (
      <PersonnelListItem data={item} key={i}/>
    ));

    return(
      <div className="editTicket">
        <div className="editHeader">
            <label>Informace o vyšetření</label>
        </div>
        <form className="editForm" onSubmit={this.handleSubmit.bind(this)}>
            <div className="editInputGroup">
                <label>Typ vyšetření</label>
                <input type ="text" name="type" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="editInputGroup">
                <label>Datum vyšetření</label>
                <input type ="text" name="examination_date" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="editInputGroup">
                <label>ID Vyšetřujícího lékaře</label>
                <input type ="text" name="examiner_id" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="editInputGroup">
                <label>Popis Vyšetření</label>
                <textarea className="editTextarea" rows = "11" cols = "77" name = "ticket_info" onChange={this.handleChange.bind(this)}></textarea>
            </div>
            <div className="editBtnContainer">
                <button type="submit" name="edit" className="editBtn">Potvrdit Změny</button>
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
