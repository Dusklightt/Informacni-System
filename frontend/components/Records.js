import React from "react";
import queryString from "query-string";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';
import RecordListItem from './Items/RecordListItem.js';

export default class Records extends React.Component {
  constructor()
  {
    super();
    this.state = { records: []};
  }

  componentDidMount(){
      var params = ""
      if(localStorage.getItem('LoggedIn') == 0){
        params = queryString.stringify({ type: "get_records_for_admin" });
      }
      if(localStorage.getItem('LoggedIn') == 1){
        params = queryString.stringify({ type: "get_records_for_doctor", UID: localStorage.getItem('userID') });
      }
      if(localStorage.getItem('LoggedIn') == 2){
        params = queryString.stringify({ type: "get_records_for_pacient", UID: localStorage.getItem('userID') });
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
                    self.setState({ records: data, role: localStorage.getItem('LoggedIn') });

                  }
                }
            );
  }


  render() {

    var recordlist = this.state.records.map((item, i) =>
    (
      <RecordListItem data={item} key={i}/>
    ));

    var jmeno = (localStorage.getItem('LoggedIn') == 0 ? "Jmeno doktora" : "Jmeno pacienta" );
    var prijmeni = (localStorage.getItem('LoggedIn') == 0 ? "Příjmení doktora" : "Příjmení pacienta" );

    return(
      <div class="main">
        <span>
        <label className="recordsLabel">Záznamy</label>
        </span>
        {(this.state.role == 1 || this.state.role == 0) && <span>
          <Link to={'/addRecord'} ><button className="editBtn">Přidat Záznam</button></Link>
        </span>}
        <div className="recordList">
          <div className="recordListHeader">
              <div class="row">
                  <div class="column">
                      Název
                  </div>
                  {localStorage.getItem('LoggedIn') != 2 && <div class="column">
                    {jmeno}
                  </div>}
                  {localStorage.getItem('LoggedIn') != 2 && <div class="column">
                      {prijmeni}
                  </div>}
                  <div class="column">
                      Datum vytvoření
                  </div>
              </div>

          </div>
          {recordlist}
        </div>
      </div>
    );
  }
}
