import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import queryString from "query-string";
import axios from 'axios';

export default class AddRecord extends React.Component {
  constructor()
  {
    super();
    this.state = {
      title: "",
      pacient_id: "",
      record_info: "",
      doctor_id: ""
    };
  }

  addRecord(){
      var params = "";
      if (localStorage.getItem('LoggedIn') == 0){
        params = queryString.stringify({ type: "create_record", title: this.state.title, pacient_id: this.state.pacient_id, doctor_id: this.state.doctor_id, record_info: this.state.record_info  });
      }
      else{
        params = queryString.stringify({ type: "create_record", title: this.state.title, pacient_id: this.state.pacient_id, doctor_id: localStorage.getItem('userID'), record_info: this.state.record_info  });
      }
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
    this.addRecord();
  }

  render() {

    return(
      <div className="editRecord">
        <div className="editHeader">
            <label>Přidat Záznam</label>
        </div>
        <form className="editForm" onSubmit={this.handleSubmit.bind(this)}>
          <div className="editInputGroup">
              <label>Název Záznamu</label>
              <input type ="text" name="title" onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="editInputGroup">
              <label>ID pacienta</label>
              <input type ="text" name="pacient_id" onChange={this.handleChange.bind(this)}/>
          </div>
          {localStorage.getItem('LoggedIn') == 0 && <div className="editInputGroup">
              <label>ID doktora</label>
              <input type ="text" name="doctor_id" onChange={this.handleChange.bind(this)}/>
          </div>}
          <div className="editInputGroup">
              <label>Popis problému</label>
              <textarea className="editTextarea" rows = "7" cols = "77" name = "record_info" onChange={this.handleChange.bind(this)}></textarea>
          </div>
          <div className="editBtnContainer">
              <button type="submit" name="edit" className="editBtn">Potvrdit Změny</button>
          </div>
        </form>
      </div>
    );
  }
}
