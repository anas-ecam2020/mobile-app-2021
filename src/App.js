import './App.css';
import Forme from './components/Forme';
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import SearchUser from './components/SearchUser'
import Container  from 'react-bootstrap/Container'
import Navigation from './components/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from './components/Auth';
import PrivateRoute from './components/PrivateRoute';


// Router app for all application components
function App() {
  return (
    <div className="App">
      <Router>

      <Navigation/>

        <Container fluid="md">
          <AuthProvider>
              <Switch>
                <PrivateRoute path="/add" component={Forme}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <PrivateRoute path="/userProfile/:name" component={UserProfile}/>
                <PrivateRoute path="/searchUser" component={SearchUser}/>

                <PrivateRoute path="/" component={Home}/>
              </Switch>
          </AuthProvider>
      </Container>
      </Router>

    </div>
  );
}

export default App;
