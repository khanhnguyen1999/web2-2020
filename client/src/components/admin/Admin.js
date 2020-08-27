
import React ,{useCallback ,useState} from "react";
import {connect} from 'react-redux' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useHistory} from 'react-router';

import Header from './partials/HeaderAdmin';
import Admin1 from './Admin1';
import Users from './Users';
import user from "../../store/reducers/user";
import Detial from './Detail';

import Transaction from './details/Transaction';

function Admin(props) {

    return (
        <Router>
          <div>
        
          <Header/>
          
          <div className="main main-raised " data-parallax="true" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center'}}>
          
            <div class="container">
              <div class="section text-center">

              <Switch>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/admin/users" component={({match},{history}) => <Users pending={false}  match={match} history={history}/>}>
                </Route>

                <Route exact path="/admin/management" component={({match},{history}) => <Users pending={true}  match={match} history={history}/>}></Route>

                <Route exact path='/admin' component={({match},{history}) => <Admin1 match={match} history={history}/>} />
                <Route exact path='/' component={({match},{history}) => <Admin1  match={match} history={history}/>} />

                <Route exact path='/admin/users/:id' component={({match},{history}) => <Detial  match={match} history={history}/>} />

                

              </Switch>

              </div>
            </div>
          </div>

      </div>
    </Router>
    )
}
function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return (<div><h2>About</h2>
  
          <Link to="/admin/user">transaction</Link>
          </div>);
  }
  
  // function Users(props) {
  //   console.log(window.location.pathname)
  //   if(window.location.pathname=="/admin"){
  //     return <Redirect to="/admin" />
  // }
  //   return (<div><h2>Users</h2>
  //   <Link to="/admin">admin</Link>
  //   </div>)
  // }

export default withRouter(Admin)
