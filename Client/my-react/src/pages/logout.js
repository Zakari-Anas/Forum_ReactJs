import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import *as  yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Login from "./login";



function logout(){
    const navigate=useNavigate();

         sessionStorage.removeItem('accessTToken');
       
            
}



export default logout
