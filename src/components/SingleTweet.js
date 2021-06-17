import React,{} from 'react';
import app from '../utils/firebase';
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export default function SingleTweet({tweet}) {
    function removeItemFromArr(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }

    const likeTweet = () =>{
        let userName = app.auth().currentUser.displayName;

        let likes = []
        if(!tweet.likes){
            likes.push(userName)
        }
        else{
            likes = tweet.likes
            if(!likes.includes(userName)){
                likes.push(userName)
            }
            else{
              removeItemFromArr(likes,userName)
            }
        }
        const tweetRef = app.database().ref('Tweets').child(tweet.id);
        tweetRef.update({
            likes: likes
        })
    }


  
    const renderLikeText = () => {
      if (tweet.userLike) return (<Button variant="danger" onClick={likeTweet}> UnBanchy</Button>);
      else return (<Button variant="info" onClick={likeTweet}>Banchy!</Button>);
    }
      
    return (
      <ListGroup.Item>


          <Link to={`/userProfile/${tweet.user}`}>
            <p> Banch from {tweet.user} </p>
          </Link>
          
          <h4> {tweet.title} </h4>
          <p>  {tweet.content} </p>

          <img width="300" src={tweet.imgUrl} alt=""></img>


        <p>  {tweet.nbLikes}             {renderLikeText()}</p>



          </ListGroup.Item>
      );
  }