import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import SingleTweet from './SingleTweet'
import Button from 'react-bootstrap/Button'

import {
    useParams
  } from "react-router-dom";


export default function UserProfile() {
    let { name } = useParams();
    var userName = app.auth().currentUser.displayName;

    const [tweetList,setTweetList] = useState();

    useEffect(()=>{
        const todoRef = app.database().ref('Tweets');
        todoRef.on('value',(snapchot)=>{
          const tweets = snapchot.val()
          const tweetList = []
          for(let id in tweets ){

            if(tweets[id].user === name ){
                var nbLikes = 0;
                //Verify that likes exsit
                var userLike = false;
                if(tweets[id].likes){
                  nbLikes = tweets[id].likes.length
                  console.log(name)
                  console.log(tweets[id].likes)
                  if(tweets[id].likes.includes(userName)){
                    userLike = true
                  }
                }
                tweetList.push({id,nbLikes,userLike, ...tweets[id]});
            }
          }
            setTweetList(tweetList);
        })
      },[name,userName])

      const followUser = async () =>{
        let userName = app.auth().currentUser.displayName; //retrouver notre nom de user
        //const userRef = app.database().ref('Users').orderByChild("name").equalTo(userName)  
        
        // Create a reference to the cities collectionconst

        const usersRef = app.database().ref('Users');
        var updated = false;

        usersRef.on('value',(snapshot)=>{
          console.log(updated)
          if(!updated){
            updated = true

            console.log("coucou je rentre")
            const users = snapshot.val()
            console.log(users)
            for(let userID in users ){
              if(users[userID].name === userName){
                // console.log(name)
                // console.log(users[userID].name)
                
                const followedPersons = users[userID].follow
                
                followedPersons.push(name)
                
                const userRef = app.database().ref('Users').child(userID);

                userRef.update({
                  follow: followedPersons
              })
              }
            }
          }
          else{
            console.log("hello")
          }
        })
  

    }

      const renderFollowText = () => {
        if (false) return (<Button variant="danger" onClick={followUser}> Unfollow</Button>);
        else return (<Button variant="info" onClick={followUser}> Follow </Button>);
      }

    return (
        <div>
            <br></br>
            {renderFollowText()}
            <br></br>
            <div> {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''} </div>

        </div>
    );
  }
