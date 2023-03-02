import React from "react";
import queryString from "query-string";
import axios from 'axios';
import TicketListItem from './Items/TicketListItem.js';

export default class Tickets extends React.Component {
  constructor()
  {
    super();
    this.state = { tickets: []};
  }

  componentDidMount(){
      var id = localStorage.getItem('LoggedIn');
      var params = "";
      if (id == 0){
        params = queryString.stringify({ type: "get_tickets_for_admin"});
      }
      else{
        params = queryString.stringify({ type: "get_tickets_for_doctor", UID: localStorage.getItem('userID') });
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
                    self.setState({ tickets: data });
                  }
                }
            );
  }

  render() {
    var ticketlist = this.state.tickets.map((item, i) =>
    (
      <TicketListItem data={item} key={i}/>
    ));

    return(
      <div class="main">
        <label className="recordsLabel">Tickety</label>
        <div className="recordList">
          <div className="recordListHeader">
              <div class="row">
                  <div class="column">
                      Název ticketu
                  </div>
                  <div class="column">
                      Datum vyšetření
                  </div>
                  <div class="column">
                      Status
                  </div>
              </div>

          </div>
          {ticketlist}
        </div>
      </div>
    );
  }
}
