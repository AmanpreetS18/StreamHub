import React, { useState } from 'react';
import MovieCard from './MovieCard';
import "./App.css";

export default function MovieList({ movies }) {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortType, setSortType] = useState('vote_count');

    const sortedMovies = [...movies].sort((a, b) => {
        if (sortType === "votes") {
            return sortOrder === "asc" ? a.vote_count - b.vote_count : b.vote_count - a.vote_count;
        } else if (sortType === "rating") {
            return sortOrder === "asc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
        } else if (sortType === "Date") {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }
    });

    const handleSort = () => {
        setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    };

    const handleSortTypeChange = (e) => {
        setSortType(e.target.value);
    };

    return (
        <div>
            <div>
                <select className='sort' value={sortType} onChange={handleSortTypeChange}>
                    <option value="votes">Votes</option>
                    <option value="rating">Rating</option>
                    <option value="Date">Release Date</option>
                </select>
                <button className='btn' onClick={handleSort}>
                    {sortType !== "Date" ? sortOrder === "asc" ? "High to Low" : "Low to High" : sortOrder === "asc" ? "New to Old" : "Old to New"}
                </button>
            </div>
            <ul className='movielist'>
                {sortedMovies.map((movies) => 
                    <MovieCard key={movies.id} movie={movies} />
                )}
            </ul>
        </div>
    )
}
