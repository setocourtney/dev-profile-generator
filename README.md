# Developer Profile Generator

Command-line application that dynamically generates a PDF profile from a GitHub username. 

## Interface

Recording of application in use: https://drive.google.com/file/d/1zNTwsgyQTk21rTSfyxI9y1Kx4ogsrYDM/view?usp=sharing

The application is invoked with the following command:

    ```sh
    node index.js
    ```

The user is prompted for a favorite color to be used as the background color for cards.

The PDF is populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

Style is generated with specified color input using generateHTML.js

## Required Node Packages

*fs : write files
*electron-html-to : convert html to pdf
*inquirer : prompt user input
*axios : api calls

