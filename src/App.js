import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Signup from './component/SignUP/Signup';
import Signin from './component/signin/Signin';
import Movieapp from './Movieapp';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import MovieList from './MovieList';
import Tvlist from './Tvlist';
import FavMovie from './FavMovie';
import FavTv from './FavTv';

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser("");
      }
    });
  }, []);

  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        
          <Route path='/movieapp' element={<Movieapp user={user} />} >
            <Route path='/movieapp/tv' element={<Tvlist />} />
            <Route path='/movieapp/movies' element={<MovieList />} />
            <Route path='/movieapp/favmov' element={<FavMovie />} />
            <Route path='/movieapp/favtv' element={<FavTv />} />
          </Route>
           
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
