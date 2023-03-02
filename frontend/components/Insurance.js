import React from "react";
import queryString from "query-string";
import axios from 'axios';
import InsuranceListItem from './Items/InsuranceListItem.js';

export default class Insurance extends React.Component {
  constructor()
  {
    super();
    this.state = { records: []};
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_tickets_for_insurance" });
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
                    self.setState({ records: data });
                  }
                }
            );
  }

  render() {

    var insurancelist = this.state.records.map((item, i) =>
    (
      <InsuranceListItem data={item} key={i}/>
    ));

    return(
      <div class="main">
        <label className="recordsLabel">Proplácení ticketů</label>
        <div className="recordList">
          <div className="recordListHeader">
              <div class="row">
                  <div class="column">
                      Název vyšetření
                  </div>
                  <div class="column">
                      Datum vyšetření
                  </div>
                  <div class="column">
                      Status
                  </div>
              </div>

          </div>
          {insurancelist}
        </div>
      </div>
    );
  }
}
