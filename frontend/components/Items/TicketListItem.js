import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class TicketListItem extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {  };
  }

  render() {

    var status = "";
    if(this.props.data.status == 0){
      status = "Čeká se na vyšetření";
    }
    if(this.props.data.status == 1){
      status = "Chybí examiner";
    }
    if(this.props.data.status == 2){
      status = "Čeká se na vyřízení";
    }
    if(this.props.data.status == 3){
      status = "Potvrzeno pojišťovnou";
    }
    if(this.props.data.status == 4){
      status = "Zamítnuto pojišťovnou";
    }
    return(
      <div className="recordListItem">
          <div className="row">
              <div className="column">
                  <Link to={'/EditTicket/'+this.props.data.ticket_id} className="nav-link">{this.props.data.type}</Link>
              </div>
              <div className="column">
                  {this.props.data.examination_date}
              </div>
              <div className="column">
                  {status}
              </div>
          </div>
      </div>
    );
  }
}
