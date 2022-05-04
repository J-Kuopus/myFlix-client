import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props; // Extracts MovieCard data
        return <div className="movie-card" onClick={() => { 
            this.state.selectedMovie = movie; }}>{movie.Title}</div>;
    }
}