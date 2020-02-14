# Developer Profile Generator

Command-line application that dynamically generates a PDF profile from a GitHub username. 

## Interface

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

Refer to <pdf> for example of output profile and <gify> for example application run.

## User Story

```
GIVEN the developer has a GitHub profile

WHEN prompted for the developer's GitHub username and favorite color

THEN a PDF profile is generated

```
