import React from 'react'
import Axios from 'axios'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './css/App.css'
import axios from 'axios'

function Home(){


  
    const [getdata,setgetData]=useState([])

    let navigate = useNavigate();

    useEffect(()=>{
      
      Axios.get('http://localhost:3001/posts').then((result)=>{setgetData(result.data)})
    },[])
    
    const Deleted=(id,name)=>{
        axios.post('http://localhost:3001/posts/delete',{id:id,name:name},{headers:{accessToken:sessionStorage.getItem('accessTToken')}}).then((result)=>{
          if(result.data.error){
            alert(result.data.error);
          }else{
             window.location.reload(false);
          }
        })
    }
    return(
      <>
          <div className='title'><h1 >Acceuil</h1></div>
        <div className="App">
          
              {getdata.map((value,key)=> {
                return(
                  
                  <div key={key}>
                             
                        <div className="post"  onClick={()=>{navigate(`/Data/${value.id}`)}}>       
                                <div className='title'><label></label> {value.title}</div>
                                <div className='body'><label></label> {value.description}</div>
                                <div className='username'><label></label>{value.username}</div>
                            
                        </div>
                               <div><button className='buton' onClick={()=>Deleted(value.id,value.username)}>delete</button></div>
                      
                  </div>  
                )

                }
              )}
           
        </div>
        </>
        
    )
}


export default Home