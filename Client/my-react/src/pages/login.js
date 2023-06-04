import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import *as  yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './css/login.css'





function Login() {



    const navigate=useNavigate();



    const initialValue={
        username:'',
        password:'',
      
    }
    const validationSchema=yup.object().shape({
        username: yup.string().min(0).max(25).required('field required'),
        password :yup.string().min(0).max(90).required('field required'),
       
    })


    const onSubmit=(data)=>{
        axios.post('http://localhost:3001/authentication/login',data).then((result)=>{ 
            if(!result.data.error){
                sessionStorage.setItem('accessTToken',result.data.accessToken);
                navigate('/')
                window.location.reload(false);
               
                }
            else{alert(result.data.error)}
        })
    }

  return (
    <div>
       <div className='Register'><h1 >Page de Connexion</h1></div>
        
                    <div className='login'>
                    
                        <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                            <Form className='form'>
                                <label>username:</label> 
                                <ErrorMessage id='em' name="username"/>     
                                <Field id='create' name='username' placeholder='(Ex.Your Name...)'autoComplete="off" />

                                <label>password:</label>    
                                <ErrorMessage id='pas'name='password'/>
                                <Field id='create' type='password' name='password' placeholder='(Ex.Your Password...)' autoComplete="off"/>
                                

                                <button id='buttn' type='submit'>Connexion</button>

                            </Form>
                        </Formik>
                    </div>
    </div>
  )
}

export default Login