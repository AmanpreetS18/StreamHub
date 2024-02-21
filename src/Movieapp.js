import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import FavMovie from './FavMovie';
import Navbar from './Navbar';

import Tvlist from './Tvlist';
import FavTv from './FavTv';
import Pagination from './Pagination';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import Frontpage from './Frontpage';

export default function Movieapp({ user }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentSeriesPage, setCurrentSeriesPage] = useState(1);
  const [totalMoviePages, setTotalMoviePages] = useState(0);
  const [totalSeriesPages, setTotalSeriesPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  

  useEffect(() => {
    if (searchQuery) {
      searchAll(searchQuery);
    } else {
      fetchMovies(currentMoviePage);
      fetchSeries(currentSeriesPage);
    }
  }, [searchQuery, currentMoviePage, currentSeriesPage]);

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`
      );
      const result = await response.json();
      setMovies(result.results);
      setTotalMoviePages(result.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSeries = async (page) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`
      );
      const result = await response.json();
      setSeries(result.results);
      setTotalSeriesPages(result.total_pages);
    } catch (error) {
      console.log('error', error);
    }
  };

  const searchAll = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1`
      );
      const result = await response.json();
      setMovies(result.results.filter((item) => item.media_type === 'movie'));
      setSeries(result.results.filter((item) => item.media_type === 'tv'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleMoviePageChange = (page) => {
    setCurrentMoviePage(page);
  };

  const handleSeriesPageChange = (page) => {
    setCurrentSeriesPage(page);
  };

  return (
    <>
      {user ? (
        <div>
          
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Frontpage />} />
            <Route
              path="/movies"
              element={
                <div>
                  <MovieList movies={movies} />
                  <Pagination
                    currentPage={currentMoviePage}
                    totalPages={totalMoviePages}
                    onPageChange={handleMoviePageChange}
                  />
                </div>
              }
            />
            <Route path="/favmov" element={<FavMovie />} />
            <Route
              path="/tv"
              element={
                <div>
                  <Tvlist series={series} />
                  <Pagination
                    currentPage={currentSeriesPage}
                    totalPages={totalSeriesPages}
                    onPageChange={handleSeriesPageChange}
                  />
                </div>
              }
            />
            <Route path="/favTv" element={<FavTv />} />
          </Routes>
         
        </div>
      ) : (
        <div>
          <h1>User is not logged in, Login first</h1>
          <button onClick={() => navigate('/')}>Login</button>
        </div>
      )}
    </>
  );
}
