import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import *as  yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './css/register.css'






function Registration() {



    const navigate=useNavigate();



    const initialValue={
        username:'',
        password:'',
      
    }
    const validationSchema=yup.object().shape({
        username: yup.string().min(5).max(25).required('field required'),
        password :yup.string().min(5).max(90).required('field required'),
       
    })


    const onSubmit=(data)=>{
        axios.post('http://localhost:3001/authentication/register',data).then((result)=>{ 
            if(!result.data.error){
                navigate('/login')
            }
            else{
                alert(result.data.error)
            }
        })
    }
    function validateEmail(value) {
        let error;
        if (!value) {
          error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
         alert(error = 'Invalid email address') ;
        }
        return error;
      }

  return (
    <div>
        <div className='Register'><h1 >Page d'inscription</h1></div>
                <div className='registration'>

                    <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({ errors, touched, validateField, validateForm }) => (
                        <Form className='form'>
                            <label>username:</label> 
                            <Field id='create' name='username' placeholder='Ex.Name@xyz.com' autoComplete="off" validate={validateEmail()}/> 
                            {errors.email  && touched.email && <div>{errors.email}</div>}

                            <label>password:</label>
                            <Field id='create' type='password' name='password' placeholder='Ex.Your Password...' autoComplete="off"/>
                            

                            <button id='buttn' type='submit'>Submit</button>

                        </Form>
                    )}
                    </Formik>
                </div>
    </div>
  )
}

export default Registration