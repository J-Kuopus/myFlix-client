import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props; // Extracts MovieCard data
        
        return <div className="movie-card" onClick={() => { 
            onMovieClick(movie); }}>{movie.Title}</div>;
    }
}