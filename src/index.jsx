import React from 'react';
import ReactDOM from 'react-dom';

// Bundles './index.scss' file
import './index.scss';

// Main component 
class myFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good morning</div>
            </div>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];



