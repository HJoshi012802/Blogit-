import Header from "./components/Header";
import React from 'react';
import { Outlet } from "react-router-dom";

const Layout
 = () => {
    return ( 
        <main>
            <Header/>
            <Outlet/>
        </main>
     );
}
 
export default Layout
;