import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class InsuranceListItem extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { data: this.props.data };
  }

  render() {
    var status = this.props.data.status;

    return(
      <div className="recordListItem">
          <div className="row">
              <div className="column">
                  <Link to={'/ReviewTicket/'+this.props.data.ticket_id} className="nav-link">{this.props.data.type}</Link>
              </div>
              <div className="column">
                  {this.props.data.examination_date}
              </div>
              <div className="column">
                  {status == 2 ? "Čeká se na vyřízení" : (status == 3 ? "Potvrzeno" : "Zamítnuto")}
              </div>
          </div>
      </div>
    );
  }
}
