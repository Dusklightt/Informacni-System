import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class RecordListItem extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { };
  }

  render() {

    return(
      <div className="recordListItem">
          <div className="row">
              <div className="column">
                  <Link to={'/EditRecord/'+this.props.data.record_id} className="nav-link">{this.props.data.title}</Link>
              </div>
              {localStorage.getItem('LoggedIn') != 2 && <div className="column">
                  {this.props.data.name}
              </div>}
              {localStorage.getItem('LoggedIn') != 2 && <div className="column">
                  {this.props.data.surname}
              </div>}
              <div className="column">
                  {this.props.data.date_created}
              </div>
          </div>
      </div>
    );
  }
}
