# Developer Profile Generator

Command-line application that dynamically generates a PDF profile from a GitHub username. 

[Recording of Application Interface](https://drive.google.com/file/d/1zNTwsgyQTk21rTSfyxI9y1Kx4ogsrYDM/view?usp=sharing)

## User Story

> AS AN a hiring manager or recruiter <br />
> I WANT to build profiles for the top developer candidates <br />
> SO THAT I can easily view the information I need to make a decision


## Interface

The application is invoked with the following command:
```node
node index.js
```
OR

```node
npm start
```
User is prompted for a github username and favorite color to be used to style the cards.



## Functionality

The PDF is populated with the following information:

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
* Style is generated with specified color input.



## Technologies

* [Node.js](https://nodejs.org/en/)
    * [fs](https://www.npmjs.com/package/fs) 
    * [electron-html-to](https://www.npmjs.com/package/electron-html-to)
    * [inquirer](https://www.npmjs.com/package/inquirer)
    * [axios](https://www.npmjs.com/package/axios)



## License

[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020 Courtney J. Seto



