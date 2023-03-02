import React from "react";

export default class PersonnelListItem extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { data: this.props.data };
  }

  render() {

    return(
      <div className="recordListItem">
          <div className="row">
              <div className="column">
                  {this.props.data.name}
              </div>
              <div className="column">
                  {this.props.data.surname}
              </div>
              <div className="column">
                  {this.props.data.phone}
              </div>
              <div className="column">
                  {this.props.data.email}
              </div>
          </div>
      </div>
    );
  }
}
