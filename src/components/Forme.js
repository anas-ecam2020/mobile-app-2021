
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

// variables in order to stock input values into form
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
  // if user exists print its username
  if (user != null) {
          console.log(user.displayName)
  }

  const createBanch = () => {
    // get user which creates a new Banch
    var user = app.auth().currentUser.displayName;
    
// Within DB it's called 'Tweets'
    const banchRef = app.database().ref('Tweets');
    const banch = {
      title,
      content,
      user,
      imgUrl
    };

    banchRef.push(banch);
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
        
          <Button variant="primary" onClick={createBanch}> Submit !</Button>

        </Form>

    </div>
  );
}