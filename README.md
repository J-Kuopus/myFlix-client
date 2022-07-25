# myFlix-client

Web version:
![Retro Video Web Version](img/retro-video-site1.jpg?raw=true "Title")

Mobile version:
<br/>
![Retro Video Web Version](img/retro-video-site2.jpg?raw=true "Title")

## Description
This is a user interface, built with React, that displays movie information. It connects to an API (found here: https://github.com/J-Kuopus/myFlix-app ) to fetch the movie data from a database (MongoDB). 

## Key Features

- Welcome view where users can register an account and login to the website
- A movies view that displays images of all of the movies
- A single movie view for each movie that displays more detailed information (synopsis, release year, etc.)
- A director view that displays information about the movie's director (bio, birthyear, etc.)
- A genre view that displays information about the movie's genre (name, description)
- A profile view that displays the user's account information
- A form for editing and updating profile information

## Tech Stack

- React
- React-Bootstrap
- 
## Dependencies

- Axios: "axios": "^0.27.2",
- Bootstrap: "bootstrap": "^5.1.3",
- PropTypes: "prop-types": "^15.8.1",
- React: "react": "^18.1.0",
- React-Bootstrap: "react-bootstrap": "^2.3.1",
- React-DOM: "react-dom": "^18.1.0",
- React-Router-DOM: "react-router-dom": "^5.3.0"

## Setup

The app is bundled through Parcel v2.5.0. To view locally:

1. Install parcel locally: npm install --save-dev parcel @parcel/transformer-sass
2. Run the parcel build with: parcel src/index.html
3. Navigate to http://localhost:1234

