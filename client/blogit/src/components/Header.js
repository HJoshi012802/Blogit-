import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext} from '../UserContext';

const Header = () => {
 const {setUserInfo,userInfo} =useContext (UserContext);

 useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
      })
    })
  }, []);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method:'POST'
    });
    setUserInfo(null)
  }

   const username =userInfo?.username;

    return ( 
        <main className="text-center bg-gray- rounded shadow-xl">
       <header className="flex justify-between  py-6 mx-12 mb-10 font-xl ">
      <Link to="/" className="font-roboto tracking-tighter hover:tracking-tight font-bold text text-5xl bg-black  text-transparent bg-clip-text p-2">Blogit!</Link>
      
      <nav className='flex gap-3  items-center'>
        {username &&(
            <nav class className='flex gap-3  items-center'>
            <button className='bg-transparent hover:bg-gradient-to-r from-violet-700 to-violet-950 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded'><Link to='/create'>Create Post</Link></button>
            <button className='bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded'>  <a onClick={logout}>Log Out</a></button>
            </nav>
        )}
        {!username &&(
        <nav className='flex gap-3  items-center'>
        <button className=' bg-transparent hover:bg-violet-700 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded'><Link to="/login" >LogIn</Link></button> 
        <button className='bg-transparent hover:bg-violet-700 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-700 hover:border- rounded'><Link to="/register">Register</Link></button> 
        </nav>

        )
        }
     
      </nav>
    </header >
        </main>
       
     );
}
 
export default Header;