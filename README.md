# spoti-vote
Web application to vote for the next song in Spotify Queue

- [Project Description:](#project-description)
	- [Requirements:](#requirements)
	- [Usage](#usage)
- [Credits](#credits)
	- [Frameworks/Tools](#frameworkstools)
	- [Useful links](#useful-links)
	- [Images](#images)

# Project Description:

The idea for this project resulted as we have a Spotify class playlist with great songs we listen to in our breaks.
The problem with it was that Spotify's shuffling feature didn't please the majority of the class.
To solve this problem I thought about creating a website where users could choose between four to eight songs (depending on the settings). The song with the most votes would be added to the queue as next song.

## Requirements:
* [Node v6.0 and higher](https://nodejs.org/en/)
* [Spotify Premium Account](https://www.spotify.com/at/) for the DJ or normal Spotify Account for the User

## Usage

To use my webpage, you first want to download [NodeJS](https://nodejs.org/en/).
Then clone my repository using:\
`git clone https://github.com/Gabsii/spoti-vote.git`

After successfully cloning the repository, you want to startup a commandline in its folder and run:\
\
`cd spoti-vote`\
`npm install`\
`npm start`\
\
open a second commandline and run the following code:\
\
`cd spoti-vote-backend`\
`npm install`\
`SETX SPOTIFY_CLIENT_ID 'FOO'`\
`SETX SPOTIFY_CLIENT_SECRET 'BAR'`\
`npm start`\

If you are using a MAC replace `SET` with `EXPORT`.
Thanks to [MPJ](https://github.com/mpj/oauth-bridge-template) for providing a framework for the backend-logic.

Congratulations! You now are able to use my webpage.

# Credits

None

## Frameworks/Tools
* Atom
* Git
* [React](https://reactjs.org/)
* [FontAwesome](https://fontawesome.com/)

## Useful links

* [SpotifyGit](https://github.com/spotify/web-api-auth-examples) - Check their repo for tutorials.
* [SpotifyTut](https://developer.spotify.com/web-api/tutorial/) - Check the tutorial on their page.
* [SpotifyBranding](https://beta.developer.spotify.com/branding-guidelines/) - Don't do anything Spotify wouldn't do
* [SpotifyDoc](https://beta.developer.spotify.com/console/) - DOCUMENTATION
* [SpotifySEO](https://beta.developer.spotify.com/dashboard/applications) - SEO is Key

## Images

* Credits to Austin Neill for his picture (found on [Unsplash](https://unsplash.com))
* Credits to Andre Benz for his picture (found on [Unsplash](https://unsplash.com))
* Credits to [Michiocre](https://github.com/Michiocre) for the Logo and Button Animation
* Credits to Treer for his icon (found on [openclipart](https://openclipart.org/detail/247324/abstract-user-icon-1))
