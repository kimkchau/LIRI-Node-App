// add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

// Spotify API
var Spotify = require('node-spotify-api');

// add code required to import the keys.js file and store it in a variable
var keys = require("./keys");

// to access the keys informaiton in Spotify
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs");

var moment = require('moment');

var inquirer = require('inquirer');

var userchoices = "";


// Inquirer
inquirer
    .prompt([
        {
            type: "list",
            message: "Please select one of the following:",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "input"
        },
        {
            type: "input",
            message: "If selected [concert-this], please enter the name of the artist/band | If selected [spotify-this-song], please enter the name of the song or press <enter> | If selected [movie-this], please enter the name of the movie or press <enter> | If selected [do-what it-says], please press <enter>",
            name: "userinput"
        }
    ])
    // short form of .then(function(answers)
    .then(answers => {
        userchoices = answers.input; // answer from the first inquirer question
        var userchoice = answers.userinput.replace(" ", "+");  // answer from the second inquirer question
        axiosCaller(userchoice);
    });

// axios function
function axiosCaller(answer) {
    // console.log(answer);
    // divider will be used as a spacer between the data we print in log.txt
    var divider = "\n------------------------------------------------------------\n";

    // Bandsintown API
    if (userchoices === "concert-this") {
        axios({
            method: "GET",
            url: "https://rest.bandsintown.com/artists/" + answer + "/events?app_id=codingbootcamp"
        }).then(function (response) {
            // console.log(response.data[0]);

            // Place the response.data[0] into a variable, jsonData
            var jsonData = response.data[0];
            // console.log(jsonData);

            // modify jsonDate info to "MM/DD/YYYY" format with moment
            var date = moment(jsonData.datetime).format("L");
        
            // concertData will print to the console
            var concertData = [
                "\nConcert Info: ",
                "\nArtist/Band: " + jsonData.lineup,
                "\nVenue: " + jsonData.venue.name,
                "\nLocation: " + jsonData.venue.city + ", " + jsonData.venue.country,
                "\nDate: " + date +"\n",
            ].join("\n");

            // Append concertData and the divider to log.txt, print concertData to the console
            fs.appendFile("log.txt", concertData + divider, function (err) {
                if (err) throw err;
                console.log(concertData);
            });

        }).catch(function (err) {
            console.log(err);
            console.log("No Upcoming Concerts");
        });
    }

    // OMDB API
    else if (userchoices === "movie-this") {
        // When the user doesn't type a name of a movie, the output data will be the movie Mr. Nobody
        if (answer === "") {
            // console.log("no selection");

            axios({
                method: "GET",
                url: "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
            }).then(function (response) {
                // console.log(response.data)

                // Place the response.data into a variable, jsonData
                var jsonData = response.data;

                // movieData will print to the console
                var movieData = [
                    "\nMovie Info:",
                    "\nTitle of the Movie: " + jsonData.Title,
                    "\nYear the movie came out: " + jsonData.Year,
                    "\nIMDB Rating: " + jsonData.Ratings[0].Value,
                    "\nRotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                    "\nCountry where the movie was produced: " + jsonData.Country,
                    "\nLanguage of the movie: " + jsonData.Language,
                    "\nPlot of the movie: " + jsonData.Plot,
                    "\nActors in the movie: " + jsonData.Actors + "\n",
                ].join("\n");

                // Append movieData and the divider to log.txt, print movieData to the console
                fs.appendFile("log.txt", movieData + divider, function (err) {
                    if (err) throw err;
                    console.log(movieData);
                });

            });

        }
        // When the user type in a name of a movie, it will display the info of the specific movie
        else {
            axios({
                method: "GET",
                url: "http://www.omdbapi.com/?t=" + answer + "&y=&plot=short&apikey=trilogy"
            }).then(function (response) {
                // console.log(response.data);

                // Place the response.data into a variable, jsonData
                var jsonData = response.data;

                // movieData will print to the console
                var movieData = [
                    "\nMovie Info:",
                    "\nTitle of the Movie: " + jsonData.Title,
                    "\nYear the movie came out: " + jsonData.Year,
                    "\nIMDB Rating: " + jsonData.Ratings[0].Value,
                    "\nRotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                    "\nCountry where the movie was produced: " + jsonData.Country,
                    "\nLanguage of the movie: " + jsonData.Language,
                    "\nPlot of the movie: " + jsonData.Plot,
                    "\nActors in the movie: " + jsonData.Actors + "\n",
                ].join("\n");

                // Append movieData and the divider to log.txt, print movieData to the console
                fs.appendFile("log.txt", movieData + divider, function (err) {
                    if (err) throw err;
                    console.log(movieData);
                });
            });
        }
    }

    // Spotify
    else if (userchoices === "spotify-this-song") {
        // If no song was entered, "The Sign" from Ace of Base will be displayed
        if (answer === "") {
            spotify
                .search({ type: 'track', query: "The Sign" })
                .then(function (response) {
                    // console.log(response.tracks.items[5]);

                    // Place the response.data into a variable, jsonData
                    var jsonData = response.tracks.items[5]

                    // songData will print to the console
                    var songData = [
                        "\nSong Info:",
                        "\nArtist(s): " + jsonData.artists[0].name,
                        "\nSong's Name: " + jsonData.name,
                        "\nPreview Song on Spotify: " + jsonData.external_urls.spotify,
                        "\nAlbum: " + jsonData.album.name + "\n",
                    ].join("\n");

                    // Append songData and the divider to log.txt, print songData to the console
                    fs.appendFile("log.txt", songData + divider, function (err) {
                        if (err) throw err;
                        console.log(songData);
                    });

                }).catch(function (err) {
                    console.log(err);
                });
        }

        else {
            // replace + with a space 
            var modifyAnswer = answer.replace("+", " ");
            // console.log(modifyAnswer);
            // console.log("Searching for the Song: " + modifyAnswer);

            spotify
                .search({ type: 'track', query: modifyAnswer })
                .then(function (response) {
                    // console.log(response.tracks.items[0]);

                    // Place the response.data into a variable, jsonData
                    var jsonData = response.tracks.items[0]

                    // songData will print to the console
                    var songData = [
                        "\nSong Info:",
                        "\nArtist(s): " + jsonData.artists[0].name,
                        "\nSong's Name: " + jsonData.name,
                        "\nPreview Song on Spotify: " + jsonData.external_urls.spotify,
                        "\nAlbum: " + jsonData.album.name + "\n",
                    ].join("\n");

                    // Append songData and the divider to log.txt, print songData to the console
                    fs.appendFile("log.txt", songData + divider, function (err) {
                        if (err) throw err;
                        console.log(songData);
                    });
                }).catch(function (err) {
                    console.log(err);
                });
        };
    }

    // Do What It Says
    else if (userchoices === "do-what-it-says") {
        fs.readFile("random.txt", 'utf8', function read(err, data) {
            if (err) {
                console.log(err);
                throw err;
            };
            // console.log(data);
            // splits the data from the random.txt file  at "," and puts it in an array
            var array = data.split(",");
            // console.log(array);

            // assigns the array variable at index of 0 to the variable unserchoices
            userchoices = array[0];
            // assigns the array variable at index of 0 to the variable unserchoices
            var userchoice = array[1].replace(" ", "+");
            axiosCaller(userchoice);
        });








    }


}














