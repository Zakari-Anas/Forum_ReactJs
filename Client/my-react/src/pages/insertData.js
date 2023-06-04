import React from 'react';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import *as  yup from 'yup';
import './css/input.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function insert(){
    const navigate=useNavigate();
    const initialValue={
        title:'',
        description:'',
        // username:''
    }

    let onSubmit=(data)=>{
       axios.post(" http://localhost:3001/posts ",data,{headers:{accessToken:sessionStorage.getItem('accessTToken')}}).then((response)=>{
        if(response.data.error){
            alert(response.data.error)
        }else{
              navigate('/');
        }
      
       })

    }
    const validationSchema=yup.object().shape({
        title : yup.string().max(90).required('field required'),
        description :yup.string().min(5).max(100000000).required('field required'),
        
    })

    return(
        <>
        <div className='title'><h1 >Ajouter un poste</h1></div>
        <div className='createPostPage'>
       
            <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Title :</label> 
                    <ErrorMessage id='erroe' name="title"/>
                    <Field id='create' name='title' placeholder='(Ex.Title)' autoComplete="off" />

                    <label>Desciption:</label>
                    <ErrorMessage id='erroe'name='description'/>
                    <Field id='create' name='description' placeholder='(Ex.Desciption)' autoComplete="off"/>


                    <button type='submit'>Submit</button>

                </Form>
            </Formik>
        </div></>
    )

}


export default insert