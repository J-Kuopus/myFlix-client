import React from 'react';

// Imports MovieCard component
import { MovieCard } from '../movie-card/movie-card';

// Imports MovieView component
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                {
                    "_id": {
                      "$oid": "625ad267bfe2c0b9d6723a12"
                    },
                    "Title": "Suspiria",
                    "Description": "An American newcomer to a prestigious German ballet academy comes to realize that the school is a front for something sinister amid a series of grisly murders.",
                    "Genre": {
                      "Name": "Horror",
                      "Description": "The horror genre is centered upon depicting terrifying or macabre events for the sake of entertainment."
                    },
                    "Director": {
                      "Name": "Dario Argento",
                      "Bio": "Dario Argento is an Italian film director, producer, screenwriter, actor and critic. His influential work in the horror genre during the 1970s and 1980s, has led him to being referred to as the 'Master of Thrill' and the 'Master of Horror'.",
                      "Birth": "1940"
                    },
                    "ImagePath": "suspiria.png",
                    "Featured": true
                  },
                  {
                    "_id": {
                      "$oid": "625aae8fbfe2c0b9d6723a0f"
                    },
                    "Title": "The Wizard of Oz",
                    "Description": "Young Dorothy Gale and her dog are swept away by a tornado from their Kansas farm to the magical Land of Oz, and embark on a quest with three new friends to see the Wizard, who can return her home and fulfill the others' wishes.",
                    "Genre": {
                      "Name": "Fantasy",
                      "Description": "The fantasy genre is defined by both circumstance and setting inside a fictional universe with an unrealistic set of natural laws."
                    },
                    "Director": {
                      "Name": "Victor Fleming",
                      "Bio": "Victor Fleming was an American film director, cinematographer, and producer whose most popular films were 'Gone with the Wind', and 'The Wizard of Oz'.",
                      "Birth": "1889",
                      "Death": "1949"
                    },
                    "ImagePath": "wizard-of-oz.png",
                    "Featured": true
                  },
                  {
                    "_id": {
                      "$oid": "625aaf12bfe2c0b9d6723a10"
                    },
                    "Title": "Logan's Run",
                    "Description": "A police officer in the future uncovers the deadly secret behind a society that worships youth.",
                    "Genre": {
                      "Name": "Science Fiction",
                      "Description": "Science fiction movies are defined by a mixture of speculation and science and often incorporate space, biology, energy, and time to explain situations and events."
                    },
                    "Director": {
                      "Name": "Michael Anderson",
                      "Bio": "Michael Anderson was an English film director, best known for directing the World War II film 'The Dam Busters', the epic 'Around the World in 80 Days' and the dystopian sci-fi film 'Logan's Run'.",
                      "Birth": "1920",
                      "Death": "2018"
                    },
                    "ImagePath": "logans-run.png",
                    "Featured": true
                  }
            ],
            selectedMovie: null
        };
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.state.selectedMovie = newSelectedMovie; }}/>)}
                </div>
            );
        }
    }
                    
 export default MainView;           

