import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {format} from 'date-fns';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

const PostPage = () => {
    const[postInfo,setPostInfo]=useState(null);
    const{userInfo}=useContext(UserContext)
    const {id}=useParams();
    
    

    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`).then(response=>{
           response.json().then(postInfo=>{
                setPostInfo(postInfo);
           });
        }
        )
    },[])
    if(!postInfo) return'';
    return ( 
        <div >
 <div className=' xl:mx-64 lg:mx-44 md:mx-24 bg-indigo-50 m-4 '>
           
           <h1 className='font-Oswald tracking-tight pb-8 md:text-6xl text-4xl font-semibold text-black p-3 text-left ms-10'>{postInfo.title}</h1>
           <div className='text-start ms-16 text-sm text-gray-500 font-normal'>
           <h5 className=''>by {postInfo.author.username}</h5>
           <p className='pb-3'>{format(new Date(postInfo.createdAt),'d MMM , YYY HH:mm')}</p>
           </div>
           
           <div className=' px-3 flex min-h-96'>
           <img  className=" mb-6  bg-cover bg-center"src={`http://localhost:4000/${postInfo.cover}`}/>
            
           </div>
           
           <div className=" text-xl p-7 mb-10" dangerouslySetInnerHTML={{__html:postInfo.content}} />
       </div>
       
       {userInfo._id===postInfo.author._id && (
               <div className='text-center mb-12'>
                 <Link className=' bg-transparent hover:bg-gradient-to-r from-violet-700 to-violet-950 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded' to={`/edit/${postInfo._id}`}> Edit Post</Link> 
               </div>
           )}
        </div>
       
     );
}
 
export default PostPage;