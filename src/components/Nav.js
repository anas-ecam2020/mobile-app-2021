import React from 'react'
import {Nav,Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

export default function Navigation() {
  

    return (
        <div>

        <Navbar bg="primary" variant="dark"> 
            <Nav className="mr-auto">
                <li class="nav-item"> <Link to="/" class="nav-link active"><img src="bancha.png" class="img-fluid" width= "56px" height="56px" border-radius="50%" overflow="hidden" margin-top="-6px"/></Link> </li>
                <li class="nav-item"> <Link to="/add" class="nav-link active" float="middle">New Banch</Link> </li>
                <li class="nav-item"> <Link to="/searchUser" class="nav-link active" >Search & Find</Link> </li>
            </Nav>
        </Navbar>

        </div>
    );
  }
