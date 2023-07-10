import {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

var toolbarOptions = ['bold', 'italic', 'underline', 'strike','link', 'image' ,'blockquote', 'code-block', {'color': [] }, {'background': []},{ 'font': [] },{ 'align': [] },{ 'header': [1, 2, 3, 4, 5, 6, false] },{ 'direction': 'rtl' },{ 'indent': '-1'}, { 'indent': '+1' },{ 'script': 'sub'}, { 'script': 'super' },{ 'list': 'ordered'}, { 'list': 'bullet' }] ;
      const modules= {
        toolbar: toolbarOptions
      };

const CreatePost = () => {
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [file,setFile]=useState('');
    const [redirect,setRedirect]=useState(false);
    
    async function createNewPost(e){
      const data =new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('content',content);
      data.set('file',file[0])
      e.preventDefault();
      console.log(file)
      const response=await fetch('http://localhost:4000/post',{
        method:'POST',
        body: data,
        credentials:'include'
     })
     if(response.ok){
      setRedirect(true);
     }}
    
    if(redirect){
     return <Navigate to={'/'}/>
     }

    return ( 
      <section className='bg- min-h-screen px-10 '>
         <h1 className='font-roboto tracking-tighter text-center pb-10 text-3xl font-bold text-violet-800 '> Create Post</h1>
      <form className='grid gap-2 text-lg' onSubmit={createNewPost}>
         <input type="title" placeholder={'Title'} value={title} onChange={e=>setTitle(e.target.value)} className='text-5xl focus:outline-none focus:shadow-outline drop-shadow-xl rounded p-2'/>
         <input type="summary" placeholder='Summary' value={summary} onChange={e=>setSummary(e.target.value)} className='text-2xl focus:outline-none focus:shadow-outline drop-shadow-xl rounded p-2'/>
         <input type="file" onChange={e=>setFile(e.target.files)}  className='p-2'/>
         <ReactQuill theme='snow' type="content" value={content} onChange={newValue=>setContent(newValue)} modules={modules} className=''/>
         <button className='mt-20 mb-12 mx-40 bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 ease-in-out drop-shadow-xl'>
            Create
         </button>
        </form>
        
      </section>
        
     );
}
 
export default CreatePost;