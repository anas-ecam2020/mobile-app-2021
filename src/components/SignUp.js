import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../utils/firebase";
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    // won't reload page on sign up button
    event.preventDefault();
    // get email and password inputs
    const { email, name, password } = event.target.elements;
    
    const userRef = app.database().ref('Users');
    userRef.get().then(async (snapchot)=>{
      const users = snapchot.val()
      for(let id in users ){
        if(users[id].name === name.value){
          return alert("Pseudo already exist")
        }
      }
      try {
        await app
        // Firebase API in order to create a new user
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
            .then(authenticate=>{
              return authenticate.user
              .updateProfile({
              displayName: name.value
              })
              
            });
        const usersRef = app.database().ref('Users');
        usersRef.push({name:name.value,follow:[name.value]});
        // if user is created, redirect to root path
        history.push("/");
      } catch (error) {
        // if user creation doesn't work
        alert(error);
      }
    })
    }, [history]);


  return (
    <div>
<br></br>
      <h2 style={{textAlign: "center"}}>Create account </h2>
      
      <Form onSubmit={handleSignUp}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter your email"/>
        </Form.Group>

      
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Your Bancher name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter your Bancher name" />
      </Form.Group>
      
      
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label> Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Enter your password" />
      </Form.Group>

        <Button variant="success" type="submit" size="lg" block> Create account ! </Button>
      </Form>
      <br></br>
      <Link to="/Login"> <Button variant="primary" size="lg" block> Back to log in </Button> </Link>
    </div>

  );
};

export default withRouter(SignUp);