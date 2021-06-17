import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import ListGroup from 'react-bootstrap/ListGroup'
import SingleTweet from './SingleTweet'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'


const Home = () => {
  const [tweetList,setTweetList] = useState();



  var user = app.auth().currentUser;
  var userName = null
  if(!user){
    userName = ""
  }
  else{
    userName = user.displayName
  }


  useEffect(()=>{
    const tweetRef = app.database().ref('Tweets');
    tweetRef.on('value',(snapchot)=>{
      const tweets = snapchot.val()
      const tweetList = []
      
      //Cherche notre propre user dans la database
      const usersRef = app.database().ref('Users');
      usersRef.on('value',(snapshot)=>{
        const users = snapshot.val()
        var followList = null
        for(let userID in users ){
          if(users[userID].name === userName){
            followList = users[userID].follow
          }
        }
        console.log(followList)
     
        for(let id in tweets ){

          if(followList.includes(tweets[id].user)){
            console.log("Yes")
            var nbLikes = 0;
            var userLike = false;
            //Verify that likes exsit
            if(tweets[id].likes){
              nbLikes = tweets[id].likes.length
              if(tweets[id].likes.includes(userName)){
                userLike = true
              }
            }
            tweetList.push({id,nbLikes,userLike, ...tweets[id]});
          }
        }
        setTweetList(tweetList);
       })  
    })
  },[userName])

  return (
    <div>
<br></br>
        <h2> Hey, {userName}! </h2>
        <br></br>
        <ListGroup>
          {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''}
        </ListGroup>
        <br></br>
        <Button onClick={() => app.auth().signOut()} variant="info">Sign out</Button>
        </div>
  );
};

export default Home;