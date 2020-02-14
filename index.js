const fs = require("fs");
const convertFactory = require("electron-html-to");
const inquirer = require("inquirer");
const htmlGenerator = require("./generateHTML.js");
const fetch = require("node-fetch");

const colors = htmlGenerator.colors;
const generateHTML = htmlGenerator.generateHTML;

const questions = [
    {
        message: "What is your github username?",
        name: "username"
    },
    {
        message: "What is your favorite color? (green/blue/pink/red)",
        name: "color"
    }
];
let gitName;
let htmlData;
let gitData;


init();

function writeToFile(fileName, data) {
    var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
      });
       
      conversion({ html: `${data}` }, function(err, result) {
        if (err) {
          return console.error(err);
        }
       
        console.log(`Developer Profile has been generated: ${fileName}.pdf \n Number of Pages: `+ result.numberOfPages);
        result.stream.pipe(fs.createWriteStream(`${fileName}.pdf`));
        conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
      });
     
}

function init() {
    inquirer
    .prompt(questions)
    .then(function(r) {
        r.color = r.color.toLowerCase();
        if(!r.username) {
            console.log("A valid username must be provided.");
        } else if (!colors[r.color]) {
            console.log("Must enter green, blue, pink, or red");
        } else {
            htmlData = generateHTML(r);
            gitName = r.username.toLowerCase();
            getGitAPI();
        }
    });
};

function getGitAPI() {
    let gitAPI = `https://api.github.com/users/${gitName}`;
    console.log(gitAPI);
    fetch(gitAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            gitData = json;
            console.log(gitData);
            generateProfile();
        });
};

function generateProfile() {

    let picture = gitData.avatar_url;
    let mapsLink = `https://www.google.com/maps/place/${gitData.location}`;
    let gitLink = gitData.html_url;
    let gitWebsite = gitData.blog;
    let bio = gitData.bio;
    let followers = gitData.followers;
    let following = gitData.following;
    let repos = gitData.public_repos;
    let stars = "";
    
    //create HTML wrappers for data
    //post to PDF
    //make video

}


