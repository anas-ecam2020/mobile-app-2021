import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../utils/firebase.js";
import { AuthContext } from "./Auth.js";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      // won't reload page on login button
      event.preventDefault();
      // get email and password inputs
      const { email, password } = event.target.elements;
      try {
        // firebase API pour faire un login
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          // if user connects successfully redirect to root path
        history.push("/");
        // if the user does not exist then show error alert
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
// if user is logged in then redirect to root path (home)
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <br></br>
      <h2 style={{textAlign: "center"}}>Sign in</h2>
  
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter your email"/>
        </Form.Group>
      
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label> Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Enter your password" />
        </Form.Group>

        <Button variant="success" type="submit" size="lg" block> Sign in </Button>
      </Form>
      <br></br>
      <Link to="/SignUp"> <Button variant="primary" size="lg" block> Create an account</Button> </Link>


    </div>
  );
};

export default withRouter(Login);