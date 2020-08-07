import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import Menu from './components/partials/navbar' ;
import Footer from './components/partials/footer' ;
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import Verify from './components/layout/Verify';
import ForgotPassword from './components/layout/ForgotPassword';
import ChangePassword from './components/layout/ChangePassword';
import Home from './components/home/landing';
import Profile from './components/profile/Profile';
import Transaction from './components/transaction/transaction';
import VerifyTransaction from './components/transaction/Cverify' ;
import Result from './components/transaction/Cresult' ;
import AddSaving from './components/saving/addSaving/addSaving' ;
import AddSavingVerify from './components/saving/addSaving/addSavingVerify' ;
import AddSavingResult from './components/saving/addSaving/addSavingResult' ;






import ListSaving from './components/saving/listSaving' ;

import itemSaving from './components/saving/itemSaving' ;
import SavingFinalization from './components/saving/savingFinalization' ;
import FinalizationResult from './components/saving/finalizationResult' ;

import SavingDetail from './components/saving/savingDetail';




function PrivateRoute ({component: Component, authed, ...rest}) {
  const currentUser = localStorage.getItem("currentUser");
  console.log(currentUser)
  return (
    <Route
      {...rest}
      render={(props) => currentUser !== null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}
class App extends Component {
  render() {
    const currentUser = localStorage.getItem("currentUser");
  return (

    <Router>
     <div>
     <Menu  switch ={currentUser!==null?1:2}/>
      <Switch>
      <Route exact path='/' component={({match},{history}) =>     <Login match={match} history={history}/>} />

      <Route exact path='/forgot-password' component={({match},{history}) =>     <ForgotPassword match={match} history={history}/>} />

      <Route exact path='/change-password' component={({match},{history}) =>     <ChangePassword match={match} history={history}/>} />

      <Route exact path='/forgot-password/check-token/:email/:token' component={({match},{history}) =>     <ChangePassword match={match} history={history}/>} />
      
      <Route exact path='/login' component={({match},{history}) =>     <Login match={match} history={history}/>} />

      <Route exact path='/register' component={({match},{history}) =>     <Register match={match} history={history}/>} />

      <Route exact path='/verify' component={({match},{history}) =>     <Verify match={match} history={history}/>} />

      <Route exact path='/home' component={Home} />
     <Route exact path='/transaction' component={Transaction} /> 

      <Route exact path='/profile' component={Profile} />
      <Route path='/transaction/verify' component={({match, history}) => <VerifyTransaction match={match} history={history}/>} />
      <Route path='/transaction/result' component={({match, history}) => <Result match={match} history={history}/>} />

      {/* router saving account */}

      <Route exact path='/savingAccount' component={({match, history}) => <ListSaving match={match} history={history}/>} />

      <Route exact path='/savingAccount/:id' component={({match, history}) => <SavingDetail match={match} history={history}/>} />

      <Route exact path='/savingAccount/:id/finalization' component={({match, history}) => <SavingFinalization match={match} history={history}/>} />

      <Route exact path='/savingAccount/:id/result' component={({match, history}) => <FinalizationResult match={match} history={history}/>} />

      {/* router add saving */}

      <Route exact  path='/addsaving' component={({match, history}) => <AddSaving match={match} history={history}/>} />

      <Route exact  path='/addsaving/verify' component={({match, history}) => <AddSavingVerify match={match} history={history}/>} />

      <Route exact  path='/addsaving/result' component={({match, history}) => <AddSavingResult match={match} history={history}/>} />

      <PrivateRoute authed={currentUser} path='/transaction' component={Transaction}/>

      </Switch>
      </div>
    </Router>

  );
}
}
export default App;
