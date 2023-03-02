import React from "react";
import queryString from "query-string";
import axios from 'axios';
import PersonnelListItem from './Items/PersonnelListItem.js';

export default class Personnel extends React.Component {
  constructor()
  {
    super();
    this.state = { records: []};
  }

  componentDidMount(){
      var params = queryString.stringify({ type: "get_doctors" });
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
    var personnellist = this.state.records.map((item, i) =>
    (
      <PersonnelListItem data={item} key={i}/>
    ));

    return(
      <div class="main">
        <label className="recordsLabel">Personál</label>
        <div className="recordList">
          <div className="recordListHeader">
              <div class="row">
                  <div class="column">
                      Jméno
                  </div>
                  <div class="column">
                      Příjmení
                  </div>
                  <div class="column">
                      Kontakt
                  </div>
                  <div class="column">
                      Email
                  </div>
              </div>

          </div>
          {personnellist}
        </div>
      </div>
    );
  }
}
