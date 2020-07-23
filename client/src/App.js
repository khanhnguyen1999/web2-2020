import React,{Component} from 'react';
import Menu from './components/layout/Navbar' ;
import Footer from './components/layout/Footer' ;
import Transaction from './components/transaction/transaction' ;
import Verify from './components/transaction/Cverify' ;
import Result from './components/transaction/Cresult' ;
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
  return (
    <Router>
      <div className="App">
        <Menu/>
        <Switch>
            {/* <Route exact path='/'component={Dashboard} /> */}
            <Route exact path='/transaction' component={Transaction} />
            <Route path='/transaction/verify' component={({match, history}) => <Verify match={match} history={history}/>} />
            <Route path='/transaction/result' component={({match, history}) => <Result match={match} history={history}/>} />
            {/* <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} /> */}
          </Switch>
          <Footer/>
      </div>
    </Router>
    
  );
}
}
export default App;
