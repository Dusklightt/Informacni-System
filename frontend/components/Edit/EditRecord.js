import React from "react";
import queryString from "query-string";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';
import TicketListItem from '../Items/TicketListItem.js';

export default class EditRecord extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { tickets: [],
    title: "", record_info: "", doctor_id: "", status: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_tickets_for_record", record_id: this.props.match.params.id });
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
                    var params = queryString.stringify({ type: "get_record", record_id: self.props.match.params.id });
                    axios.post("http://www.stud.fit.vutbr.cz/~xstafl01/router.php", params)
                          .then(function(response) {
                                var record = response.data[0];
                                if(response.statusText != "OK" || response.status != 200)
                                {
                                  //ERROR
                                }
                                else
                                {
                                  self.setState({ tickets: data, title: record.title, record_info: record.record_info, doctor_id: record.doctor_id });
                                }
                              }
                          );
                  }
                }
            );
  }

  editRecord(){
      var params = queryString.stringify({ type: "update_record", record_id: this.props.match.params.id, title: this.state.title, record_info: this.state.record_info, doctor_id: this.state.doctor_id, status: this.state.status });
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
                      self.props.history.push("/records");
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
    this.editRecord();
  }

  render() {
    var ticketlist = this.state.tickets.map((item, i) =>
    (
      <TicketListItem data={item} key={i}/>
    ));

    var disabled = (  localStorage.getItem('LoggedIn') == 1 ? "" : (   localStorage.getItem('LoggedIn') == 0 ? "" : "disabled")    );

    return(
      <div>
  			<div className="editRecord">
          <div className="editHeader">
              <label>Upravit Záznam</label>
          </div>
          <form className="editForm" onSubmit={this.handleSubmit}>
            <div className="editInputGroup">
                <label>Jméno Záznamu</label>
                <input type ="text" name="title" value={this.state.title} disabled={disabled} onChange={this.handleChange}/>
            </div>
            <div className="editInputGroup">
                <label>ID Spravujícího doktora</label>
                <input type ="text" name="doctor_id" value={this.state.doctor_id} disabled={disabled} onChange={this.handleChange}/>
            </div>
            <div className="editInputGroup">
                <label>Informace o záznamu</label>
                <textarea className="editTextarea" rows="7" cols="77" name="record_info" value={this.state.record_info} disabled={disabled} onChange={this.handleChange}></textarea>
            </div>
            <div className="editBtnContainer">
                {disabled == "" && <button type="submit" name="edit" className="editBtn">Potvrdit Změny</button>}
            </div>
          </form>
  			</div>
        <div className="main">
          <label className="recordsLabel">Tickety</label>

          {disabled == "" && <span>
            <Link to={'/addTicket/'+this.state.doctor_id+'/'+this.props.match.params.id} ><button className="editBtn">Přidat Ticket</button></Link>
          </span>}
          <div className="recordList">
            <div className="recordListHeader">
                <div className="row">
                    <div className="column">
                        Název Ticketu
                    </div>
                    <div className="column">
                        Datum vyšetření
                    </div>
                    <div className="column">
                        Status
                    </div>
                </div>

            </div>
            {ticketlist}
          </div>
        </div>
      </div>
    );
  }
}
