const fs = require("fs");
const convertFactory = require("electron-html-to");
const inquirer = require("inquirer");
const htmlGenerator = require("./generateHTML.js");
const axios = require("axios");

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


init();

async function init() {
    try {
        //prompt user for questions
        const answers = await inquirer.prompt(questions);

        //check user responses
        answers.color = answers.color.toLowerCase();
        if(!answers.username) {
            console.log("A valid username must be provided.");
            return;
        } else if (!colors[answers.color]) {
            console.log("Must enter green, blue, pink, or red");
            return;
        } else {
            htmlData = generateHTML(answers);
            gitName = answers.username.toLowerCase();
        };
        
        //get git api data
        const gitAPI = await axios.get(`https://api.github.com/users/${gitName}`);
        const gitData = gitAPI.data;

        //get git star api data
        const starAPI = await axios.get(`https://api.github.com/users/${gitName}/starred`);
        const gitStars = starAPI.data[0].stargazers_count;

        //generate profile with API data
        generateProfile(gitData, gitStars);

    } catch (err) {
        console.log(err);
    }
};

function generateProfile(gitData, gitStars) {

    let picture = gitData.avatar_url;
    let fullName = gitData.name;
    let mapsLink = `https://www.google.com/maps/place/${gitData.location}`;
    let gitLink = gitData.html_url;
    let gitWebsite = gitData.blog;
    let bio = gitData.bio;
    let followers = gitData.followers;
    let following = gitData.following;
    let repos = gitData.public_repos;
    let stars = gitStars;
    
    htmlData += `
    </head>
    <body>
        <div class="wrapper">
            <div class="photo-header">
                <img src = ${picture} alt="${fullName}">
                <h1>Hi!</h1>
                <h2>My name is ${fullName}!</h2>
                <div class="links-nav">
                    <i class="fas fa-location-arrow"></i> <a class="nav-link" href="${mapsLink}">${gitData.location}</a>
                    <i class="fab fa-github"></i></i> <a class="nav-link" href="${gitLink}">GitHub</a>
                    <i class="fas fa-external-link-alt"></i> <a class="nav-link" href="${gitWebsite}">Website</a>
                </div>
            </div>
        <main class="container">
            <div class="row">
                <div class="col"><h3>${bio}</h3></div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <h3>Public Repositories</h3>
                        <h5>${repos}</h5>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <h3>Followers</h3>
                        <h5>${followers}</h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <h3>GitHub Stars</h3>
                        <h5>${stars}</h5>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <h3>Following</h3>
                        <h5>${following}</h5>
                    </div>
                </div>
            </div>
        </main>
    </div>
    </body>
</html>    
    `
    writeToFile(gitName, htmlData);
};

//create pdf file of developer profile usting html
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
};


