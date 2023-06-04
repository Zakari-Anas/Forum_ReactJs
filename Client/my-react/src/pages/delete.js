import react from 'react';
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'


function Deleted(){

            const {id}=useParams();
    axios.post(`http://localhost:3001/posts/${id}`.then((result)=>{
            console.log('deleted')
}))


}



export default Deleted;