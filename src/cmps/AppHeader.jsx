import React from 'react'
import { Link } from 'react-router-dom';
export function AppHeader() {
    return (
        <header className="main-header flex align-center space-between">
            <div className="logo"><a href="/">Make Eat</a></div> 
            <ul className="main-nav flex">
                <Link to='/user/u103/about'><li className="link flex align-center">Profile</li></Link>
            </ul>
        </header>
    )
}
