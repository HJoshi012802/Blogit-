import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./Layout";
import { Route,Routes } from "react-router-dom";
import Register from "./pages/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/Postpage";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
    <Routes>
    <Route path='/' element={<Layout/> }>
       <Route index element={<Home/>}/> 
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/create' element={<CreatePost/>}/>
       <Route path='/post/:id' element={<PostPage/>}/>
       <Route path='/edit/:id' element={<EditPost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
