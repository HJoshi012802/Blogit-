import React from 'react';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';

const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
    return ( 
    <section className=" my-8 mx-12 grid grid-rows text-start">
      <div className=' bg-gray-100 mt-10 shadow-lg rounded-xl'>
        <Link to={`/post/${_id}`}>
        <img className='md:float-left overflow:hidden p-2'  style={{height:300, width:450}}   src={`http://localhost:4000/${cover}`}  alt="post img"/>
        </Link>
      <div>
      <Link to={`/post/${_id}`}>
      <h2 className='text-3xl font- font-bold text-gray-800 p-2'>{title}</h2>
          </Link>
        
        <span className='text-sm text-gray-500 px-7 m-1 lg:flex md:grid'><a className='md:mx-0 mx-3 text-gray-600'>{author.username}</a> <time className='md:mx-1 mx-3'>{format(new Date(createdAt),'d MMM,YYY HH:mm')}</time></span>
        <p  className='text-base font-mono  p-3'>{summary}</p>
      </div>
    </div>
    </section>
      
     );
}
 
export default Post;