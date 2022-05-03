import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movieData } = this.props; // Extracts MovieCard data
        return <div className="movie-card">{movie.Title}</div>;
    }
}