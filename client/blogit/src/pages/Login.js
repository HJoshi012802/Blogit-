import {useContext, useState}from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Login = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo} =useContext(UserContext);

   async function login(e){
      e.preventDefault();
     const response=await fetch ("http://localhost:4000/login",
      {
        method:'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
      });
      
      if(response.ok){
        response.json().then(userInfo=>{
         setUserInfo(userInfo)
          setRedirect(true);
        })
        
      }else{
        alert('wrong Credentials')
      }
    }

    if(redirect){
      return <Navigate to={'/'}/>
    }

    return ( 
    
      <div className="w-full max-w-xs mx-auto mt-20">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Login</h3>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" 
            type="text" 
            placeholder="Username"
             value={username} 
             onChange={e=>setUsername(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
            type="password" placeholder="*********"
            value={password} 
            onChange={e=>setPassword(e.target.value)}/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Log In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-violet-600 hover:text-violet-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
    
      </div>

    
        
     );
}
 
export default Login;