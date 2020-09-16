import React from 'react'
import { Link } from 'react-router-dom';
export function AppHeader() {
    return (
        <header className="main-header flex align-center space-between">
           <div className="logo">Make Eat</div> 
            <ul className="main-nav flex">
                <Link to='/login'><li className="link flex align-center">Login</li></Link>
                

            </ul>
        </header>
    )
}
