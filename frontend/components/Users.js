import React from "react";
import queryString from "query-string";
import axios from 'axios';
import UsersListItem from './Items/UsersListItem.js';

export default class Users extends React.Component {
  constructor()
  {
    super();
    this.state = { users: []};
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_users" });
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
                    self.setState({ users: data });
                  }
                }
            );
  }

  handleDelete(index){
    var users = this.state.users;
    users.splice(index, 1);
    this.setState({users: users});
  }

  render() {

    var userslist = this.state.users.map((item, i) =>
    (
      <UsersListItem history={this.props.history} data={item} index={i} key={i} delete={this.handleDelete.bind(this)}/>
    ));
    return(
      <div class="main">
        <label className="recordsLabel">Uživatelé</label>
        <div className="recordList">
          <div className="recordListHeader">
              <div class="row">
                  <div class="column">
                      ID
                  </div>
                  <div class="column">
                      Jméno
                  </div>
                  <div class="column">
                      Příjmení
                  </div>
                  <div class="column">
                      Role
                  </div>
              </div>

          </div>
          {userslist}
        </div>
      </div>
    );
  }
}
