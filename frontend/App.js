import './style.css';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Register from './components/Login/Register.js';

import About from './components/About.js';
import TopBar from './components/TopBar.js';
import NavBar from './components/NavBar.js';
import Records from './components/Records.js';
import Tickets from './components/Tickets.js';
import Personnel from './components/Personnel.js';
import Users from './components/Users.js';
import Insurance from './components/Insurance.js';
import AddRecord from './components/Add/AddRecord.js';
import AddTicket from './components/Add/AddTicket.js';
import EditProfile from './components/Edit/EditProfile.js';
import EditRecord from './components/Edit/EditRecord.js';
import EditTicket from './components/Edit/EditTicket.js';
import ReviewTicket from './components/ReviewTicket.js';
import TransferRecords from './components/TransferRecords.js';

function App() {
  return (
    <Router>
      <TopBar/>
      <NavBar/>
      <Switch>
          <Route exact path="/">
            <Redirect to="/about" />
          </Route>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/about' component={About} />
          <Route path='/records' component={Records} />
          <Route path='/tickets' component={Tickets} />
          <Route path='/personnel' component={Personnel} />
          <Route path='/users' component={Users} />
          <Route path='/insurance' component={Insurance} />
          <Route path='/addRecord' component={AddRecord} />
          <Route path='/addTicket/:doctor_id/:id' component={AddTicket} />
          <Route path='/reviewTicket/:id' component={ReviewTicket} />
          <Route path='/transfer/:id/:role' component={TransferRecords} />
          <Route path='/editProfile/:id' component={EditProfile} />
          <Route path='/editRecord/:id' component={EditRecord} />
          <Route path='/editTicket/:id' component={EditTicket} />
      </Switch>
    </Router>
  );
}

export default App;
