import React from 'react';
import ReactDOM from 'react-dom';
// Imports MainView component
import  MainView  from './components/main-view/main-view';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

// Bundles './index.scss' file
import './index.scss';

// Main component 
class MyFlixApplication extends React.Component {
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

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);




