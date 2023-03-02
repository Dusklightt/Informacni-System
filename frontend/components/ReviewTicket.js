import React from "react";
import queryString from "query-string";
import axios from 'axios';

export default class ReviewTicket extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { title: "", examination_date: "", examiner_id: "", name: "", surname: "", ticket_info: ""  };
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_ticket", ticket_id: this.props.match.params.id });
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
                    self.setState({ title: data[0].type, examination_date: data[0].examination_date, examiner_id: data[0].examiner_id, name: data[0].name, surname: data[0].surname, ticket_info: data[0].ticket_info });
                  }
                }
            );
  }

  updateTicket(num){
      var params = queryString.stringify({ type: "edit_ticket", ticket_id: this.props.match.params.id, doctor_id: "", ticket_type: "", ticket_info: "", examination_date: "", examiner_id: "", status: num, insurance_comment: "" }); //TODO USER ID
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
                    self.props.history.push("/insurance");
                  }
                }
            );
  }

  handleSubmit(event) {
    this.updateTicket(event.target.value);
  }

  render() {
    return(
  			<div className="editTicket">
          <div className="editHeader">
              <label>Upravit ticket</label>
          </div>
          <form className="editForm">
              <div className="editInputGroup">
                  <label type ="text" name="examinationType">{this.state.title}</label>
              </div>
              <div className="editInputGroup">
                  <label type ="text" name="date">{this.state.examination_date}</label>
              </div>

              <div className="editInputGroup">
                  <label type ="text" name="examineerDoctor">{this.state.name} {this.state.surname}</label>
              </div>

              <div className="editInputGroup">
                  <label>{this.state.ticket_info}</label>
              </div>
          </form>
          <div>
            <div className="editBtnContainer">
                <button onClick={this.handleSubmit.bind(this)} type="confirm" value="3" className="editBtn">Potvrdit</button>
            </div>
            <div className="editBtnContainer">
                <button onClick={this.handleSubmit.bind(this)} type="deny" value="4" className="editBtn">Zamítnout</button>
            </div>
          </div>
  			</div>
    );
  }
}
