import React from "react";
import queryString from "query-string";
import axios from 'axios';
export default class EditTicket extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
       ticket_type: "", ticket_info: "", examination_date: "", examiner_id: "", status: "0", insurance_comment: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_ticket", ticket_id: this.props.match.params.id }); //TODO USER ID
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
                    self.setState({ ticket_type: data.type, ticket_info: data.ticket_info, examination_date: data.examination_date, examiner_id: data.examiner_id, insurance_comment: data.insurance_comment });
                  }
                }
            );
  }

  editTicket(){
      var params = queryString.stringify({ type: "edit_ticket", doctor_id: "", ticket_id: this.props.match.params.id, ticket_type: this.state.ticket_type, ticket_info: this.state.ticket_info, examination_date: this.state.examination_date, examiner_id: this.state.examiner_id, status: this.state.status, insurance_comment: this.state.insurance_comment });
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
                      self.props.history.push("/tickets");
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
    this.editTicket();
  }

  render() {

    var disabled = (localStorage.getItem('LoggedIn') == 1 ? "" : (localStorage.getItem('LoggedIn') == 0 ? "" : "disabled"));
    var disabledStatus = (((this.state.status > 2) || (disabled == "disabled")) ? "disabled" : "");

    return(
  			<div className="editTicket">
          <div className="editHeader">
              <label>Upravit ticket</label>
          </div>
          <form className="editForm" onSubmit={this.handleSubmit}>
              <div className="editInputGroup">
                  <label>Typ vyšetření</label>
                  <input type ="text" name="ticket_type" value={this.state.ticket_type} disabled={disabled} onChange={this.handleChange}/>
              </div>
              <div className="editInputGroup">
                  <label>Datum vyšetření</label>
                  <input type ="text" name="examination_date" value={this.state.examination_date} disabled={disabled} onChange={this.handleChange}/>
              </div>
              <div className="editInputGroup">
                  <label>ID Vyšetřujícího lékaře</label>
                  <input type ="text" name="examiner_id" value={this.state.examiner_id} disabled={disabled} onChange={this.handleChange}/>
              </div>
              <div className="editInputGroup">
                <select name="status" id="roles" disabled={disabledStatus} onChange={this.handleChange} defaultValue={this.state.status}>
                  <option value="0">Čeká se na vyšetření</option>
                  <option value="1">Chybí examiner</option>
                  <option value="2">Čeká se na vyřízení</option>
                </select>
              </div>
              <div className="editInputGroup">
                  <label>Popis Vyšetření</label>
                  <textarea className="editTextarea" rows="11" cols="77" name="ticket_info" value={this.state.ticket_info} disabled={disabled} onChange={this.handleChange}></textarea>
              </div>
              <div className="editBtnContainer">
                  {disabled == "" && <button type="submit" name="edit" className="editBtn">Potvrdit Změny</button>}
              </div>
          </form>
  			</div>
    );
  }
}
