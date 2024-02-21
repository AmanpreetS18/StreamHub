import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
// import { useState } from 'react'
// import movies from './movies'

import { BiSolidCameraMovie } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import './App.css'
export default function Navbar({onSearch}) {

  return (
    <div>
        <nav className='navbar'>
        <div className='logo'>
            <Link to="/movieapp"><BiSolidCameraMovie size={40} color='#ff5722' /></Link><h1 >StreamHub</h1> 
        </div>
            <ul className='nav'>
                  <li>
                    <Link to="/movieapp">Home</Link>
                </li>
                
                <li>
                    <Link to="/movieapp/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/movieapp/tv">TV</Link>
                </li>
                <li>
                    <Link to="/movieapp/favmov">Movie Library</Link>
                </li>
                <li>
                    <Link to="/movieapp/favTv">TV Library</Link>
                </li> 
                
                
                
            </ul>
            <div className='searchbar'>
                     <SearchBar onSearch={onSearch}/>
                </div>
                <div className='signout'>
                    <Link to='/signin' style={{display:'flex', justifyContent:'center',alignItems:'center'}}><VscAccount size={20} color='white'/> Signout</Link>
                </div>
           
        </nav>
    </div>
  )
}
