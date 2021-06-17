
import {React, useState } from 'react';
import app from '../utils/firebase';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from "react-router";


export default function Forme() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [submit, setSubmit] = useState('')


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) =>{
    setContent(e.target.value)
  };
  const handleImgChange = (e) =>{
    setImgUrl(e.target.value)
  };


  var user = app.auth().currentUser;
  if (user != null) {
          console.log(user.displayName)
  }
  const createTodo = () => {
    var user = app.auth().currentUser.displayName;

    const todoRef = app.database().ref('Tweets');
    const todo = {
      title,
      content,
      user,
      imgUrl
    };

    todoRef.push(todo);
    console.log("Helllooo")
    setSubmit(true)
  };

  if(submit === true){
    return(
      <Redirect to="/"/>
    )
  }
  
  return (
    <div>
<br></br>
        <h2 style={{textAlign: "center"}}>Create a Banch</h2>
        <br></br>

        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Subject of your Banch</Form.Label>
            <Form.Control type="text" placeholder="Enter a title here !" onChange={handleTitleChange} value={title} />
          </Form.Group>
        
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Banch</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={handleContentChange} value={content} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Image URL (optional) </Form.Label>
            <Form.Control type="text" placeholder="Enter a title here !" onChange={handleImgChange} value={imgUrl} />
          </Form.Group>
        
          <Button variant="primary" onClick={createTodo}> Submit !</Button>

        </Form>

    </div>
  );
}