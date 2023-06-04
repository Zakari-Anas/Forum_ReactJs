import react from 'react';
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import './css/App.css'
import './css/comment.css'




function Post(){
  const {id}=useParams();
  const [dataa,setdata]=useState({});
  const [Comments,setComments]=useState([])
  const [newComment,setnewComment]=useState('');



useEffect(()=>{
  axios.get(`http://localhost:3001/posts/${id}`).then((result)=>{

    setdata(result.data)
  })

  axios.get(`http://localhost:3001/Comments/${id}`).then((result)=>{

    setComments(result.data)

  })


},[])  

const addComment=()=>{
    axios.post(`http://localhost:3001/Comments`,{comment:newComment,TableId:id},{headers:{accessToken:sessionStorage.getItem('accessTToken')}}).then((result)=>{
      if(!result.data.error){
        const newcomment={comment:result.data.Comment.comment,userName:result.data.Comment.userName}
            setComments([...Comments,newcomment])
            window.location.reload(false);
           
      }
      else if(result.data.error){
        alert(result.data.error);
      }
      else{
             alert('user not logged in....')
      }
  })

  }
  const handleClick =(event) => {
    event.preventDefault();

    if (message.trim().length !== 0) {
     alert ('input value is NOT empty');
    } else {
      alert ('input value is empty');
    }
  };
  const supp=(userName,id)=>{
    axios.post('http://localhost:3001/Comments/delete',{userName:userName,id:id},{headers:{accessToken:sessionStorage.getItem('accessTToken')}}).then((result)=>{
      if(result.data.error){
        alert(result.data.error)
      }else{
        alert(result.data)
        window.location.reload(false);
      }
    })
  }
  const Update=(userName,id)=>{
        axios.post('http://localhost:3001/Comments/update',{userName:userName,id:id,comment:newComment},{headers:{accessToken:sessionStorage.getItem('accessTToken')}}).then((result)=>{

              if(!result.data.error) {
                alert(result.data);
                window.location.reload(false);
              }   
              else if (result.data.error){
                alert(result.data.error);
              }
        })
  }

    return(
    <div className='App'>
      <div className='post'>
          <div className='title'>{dataa.title}</div>
          <div className='body'>{dataa.description}</div>
          <div className='username'>{dataa.username}</div>
      </div>
      <div className='container'>
          <div className='addComment'><input className='inpout' onClick={handleClick} onChange={(event)=>{setnewComment(event.target.value)}} autoComplete='off' type='text' placeholder={'Your comment'}/>
                                      <button className='button-52'  onClick={addComment}>Ajouter</button>
          </div>  

          
          <div className='Comments'>
                    {Comments.map((event,key)=>{
                            return  <div  key={key} className='Comments'>
                                        <div className='comment'>  
                                       <div className='username'>{event.userName}</div>
                                        
                                         <div className='Comment' > {event.comment}</div>
                                         </div>
                                         <button className='button-52' onClick={()=>supp(event.userName,event.id)}>Supprimer</button>
                                         <button className='button-52' onClick={()=>Update(event.userName,event.id,newComment)}>Modifier</button>
                                    </div>
                        
                        })
                    }   
          </div>
      </div>
    </div>

)

}


export default Post;