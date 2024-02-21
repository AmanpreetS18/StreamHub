import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from './slider';
import './Home.css'; // Assuming you have a CSS file for styling

export default function Frontpage() {
    const navigate = useNavigate();

    return (
        
            <div className="home-container">
            <header className="header">
                <h1>Welcome to <span className="brand-name">StreamHub</span></h1>
                <p>Explore a world of cinematic wonders with <span className="brand-name">StreamHub</span>. Dive into a vast collection of films, discover new releases, and enjoy timeless classics. Your journey into the world of movies starts here!</p>
            </header>

            <section className="featured-section">
                <h2>Featured Movies</h2>
                <Slider className="Sliderr" />
            </section>

            <section className="explore-section">
                <h2>Explore Movies and Series</h2>
                <p>Ready to dive in? Explore our vast collection of movies, ranging from the latest blockbusters to timeless classics.</p>
                <button className="explore-button" onClick={() => navigate('/movieapp/movies')}>Explore All Movies</button>
                <button className="explore-button" onClick={() => navigate('/movieapp/tv')}>Explore TV Series</button>
            </section>

            <footer className="footer">
                <p>© {new Date().getFullYear()} StreamHub. All rights reserved.</p>
            </footer>
        </div>
       
    );
}
