import React,{Component} from "react";
import {useState,useEffect} from 'react'
import Axios from 'axios'
import Home from "./pages/Home";
import Insert from './pages/insertData'
  import{BrowserRouter as Router,Route,Routes,Link, useNavigate} from "react-router-dom"
import Error from './pages/Error'
import Login from "./pages/login";
import Logout from './pages/logout'
import Registration from "./pages/registration";
import './app.css'
import Post from './pages/createpost';
import Deleted from './pages/delete';
import { Navigate } from "react-router-dom";
import axios from "axios";
import companyLogo from './odWLOwNx7sPwmBhZSFPfvdQVVJYDfJ1WsVhHcjdg.jpeg';
  
function App(){



        return(
          <>
          
            <div>
                <Router>
                  <nav className="nav">
                    {!sessionStorage.getItem('accessTToken') &&(
                        <>
                            <Link className='navlink' to='/'>Acceuil</Link>
                            <Link  className='navlink' to='/register'>Créer nouveau compte </Link>
                            <Link className='navlink' to='login'>Se connecter</Link>
                        </>
                      )
                    }   
                    {sessionStorage.getItem('accessTToken') &&(  
                          <>
                            <Link id='link' className='navlink' to='/insertData'>Poster</Link>
                            <Link className='navlink' to='/'>Acceuil</Link>
                            <Link className='navlink'onClick={() => window.location.reload(false)} to='/logout'>Deconnexion</Link>
                          </>)
                    } 
                 
                    
                  </nav>
                  <img className="logo" src={companyLogo} alt="BigCo Inc. logo"/>
                    <Routes>
                          <Route exact path="/" element={<Home/>}/>
                          <Route exact path="/insertData" element={<Insert/>}/>
                          <Route exact path="/Data/:id" element={<Post/>}/>
                          <Route exact path="/delete/:id" element={<Deleted/>}/>
                          <Route exact path='/register' element={<Registration/>}/>
                          <Route exact path='/login' element={<Login/>}/>
                          <Route exact path='/logout' element={<Logout/>}/>

                          <Route exact path="*" element={<Error/>}/>
                    </Routes>               
                </Router>
            </div>
          </>
        )

}


// export default App;
export default App;
