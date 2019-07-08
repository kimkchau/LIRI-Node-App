# LIRI-Node-App
In this project, LIRI, has been created.  LIRI is a Language Interpretation and Recognition Interface app.  LIRI is a command line node app that takes in parameters and gives back data.  It uses the Spotify API to search for songs, Bands in Town API to search for concerts, and the OMDB API to search for movies.  LIRI will retrieve the necessary data to power the app by sending requests using the AXIOS package to the Bands in Town and OMDB APIs.

## Prerequisites
Node.js must be installed on the computer.  See https://nodejs.org/en/download/ for instructions.

## Overview
1. LIRI will search for songs, concerts, and movies using the Spotify, Bands in Town, and OMDB APIs respectively
1. The following Node packages were needed for the project: Node Spotify Api, Axios, Moment, DotEnv, fs, and inquirer
1. To start the app, navigage to the root of the project and run, `node liri.js` in the Terminal command line.
1. liri.js uses keys.js to import the Spotify keys that are contained in the .env file, which is ignored in github
1. .gitignore contains file types that are not pushed to github

## Installing
1. Clone the source files from github, https://github.com/kimkchau/LIRI-Node-App
1. In terminal, navigate to the root of the downloaded directory and install the Node packages by entering `npm install node-spotify-api axios moment dotenv`
1. Create the file .env in the same folder as the liri.js file
1. Add your personal Spotify API keys in the .env file as follow:
    `# Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret`

## Operation
1. To start the LIRI app, navigage to the root of the project and run, `node liri.js` in the Terminal command line.
1. Please select one of the following: <concert-this>, <spotify-this-song>, <movie-this>, <do-what-it-says>
1. The app will then ask for a user input: 
    1. enter a name of a band/artist if you selected <concert-this> 
    1. enter a name of a song if you selected <spotify-this-song> or press enter and the default song will be "The Sign" by Ace of Base
    1. enter a name of a move if you selected <movie-this> or press enter and the default movie will be "Mr. Nobody"
    1. press enter if you selected <do-what-it-says>, the app will read the text inside the random.txt file and will complete one of the LIRI's commands
1. In addition to logging the data in the Terminal, the data is also appended to "log.txt" file

## Testing
Using Visual Studio Code, LIRI was excuted with various scenarios.  Please refer to the video for a deomostration 

   