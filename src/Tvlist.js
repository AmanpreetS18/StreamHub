import React, { useState } from 'react'

import "./App.css"
import TvCard from './TvCard'
export default function Tvlist({ series }) {
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortType, setSortType] = useState('vote_count');

    const sortedMovies = [...series].sort((a, b) => {
        if (sortType === "votes") {
            return sortOrder === "asc" ? a.vote_count - b.vote_count : b.vote_count - a.vote_count;
        } else if (sortType === "rating") {
            return sortOrder === "asc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
        } else if (sortType === "Date") {
            const dateA = new Date(a.first_air_date);
            const dateB = new Date(b.first_air_date);
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
        <div >
            <div>
                <select value={sortType} onChange={handleSortTypeChange}>
                    <option value="votes">Votes</option>
                    <option value="rating">Rating</option>
                    <option value="Date">Release Date</option>
                </select>
                <button onClick={handleSort}>
                    {sortType !== "Date" ? sortOrder === "asc" ? " High to Low" : "Low to High" : sortOrder === "asc" ? "New to Old" : "Old to New"}
                </button>
            </div>
            <ul className='movielist'>
                {sortedMovies.map((tv) =>
                    <TvCard key={tv.id} tv={tv} />)}
            </ul>

        </div>
    )
}
