import {React, useState } from "react";
import app from "../utils/firebase";
import { compareTwoStrings} from 'string-similarity';
import {Link} from 'react-router-dom'


export default function SearchUser() {
    const [userList,setUserList] = useState();

    const searchInputChange = (e) => {
        const userName = e.target.value.toLowerCase()
        console.log(userName)
        const userRef = app.database().ref('Users');
        userRef.get().then(async (snapchot)=>{
          console.log("...")
          const users = snapchot.val()
          console.log(users)
          const userList = []
          for(let id in users ){
            if(  compareTwoStrings(users[id].name.toLowerCase(),userName) >0.65){
                userList.push(users[id])
            }
          }
          setUserList(userList)
        })
      }
  
    return (
        <div>
        <br></br>
        <h1>Find a Bancher</h1>
        <br></br>
        <p>Bancher name: <input type="text" onChange={searchInputChange}/></p>

        <ul> {userList ? userList.map((user)=> 
                            <Link to={`/userProfile/${user.name}`}>
                                <li> 
                                    {user.name}
                                </li>
                            </Link>):''}  </ul>

            



        </div>
    );
  }
