# spoti-vote
Web application to vote for the next song in Spotify Queue

[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![CircleCI](https://circleci.com/gh/Gabsii/spoti-vote/tree/master.svg?style=svg)](https://circleci.com/gh/Gabsii/spoti-vote/tree/master)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

# Project Description:

The idea for this project resulted as we have a Spotify class playlist with great songs we listen to in our breaks.
The problem with it was that Spotify's shuffling feature didn't please the majority of the class.
To solve this problem I thought about creating a website where users could choose between four songs (depending on the settings). The song with the most votes would be added to the queue as next song.

## Requirements:
* [Node v16.0 and higher](https://nodejs.org/en/)
* [Spotify Premium Account](https://www.spotify.com/at/) for the DJ

## Usage

### Installation

To use my webpage, you first want to download [NodeJS](https://nodejs.org/en/).
Then clone the repository using:
```
git clone https://github.com/Gabsii/spoti-vote.git
cd spoti-vote 
```
Then you can install the dependencies of the projekt using npm:
```
npm install
```

After that, in the `backend` folder, copy the `.env.template` file and rename it to `.env`.
Here you can configure ports and address.
The SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET are provided by spotify after you sign up for their developer system.
```
PORT=8888
ADDRESS=localhost
SPOTIFY_CLIENT_ID=FOO
SPOTIFY_CLIENT_SECRET=BAR
SPOTIFY_ADDRESS=https://api.spotify.com
```
Replace `foo` with your `SPOTIFY_CLIENT_ID` and `bar` with your `SPOTIFY_CLIENT_SECRET`.

Then run `npm start` in the root folder to get started.
### Info

If you can't run a port below 1024 without root permission see [this](http://pm2.keymetrics.io/docs/usage/specifics/).
Thanks to [MPJ](https://github.com/mpj/oauth-bridge-template) for providing a framework for the backend-logic.

Congratulations! You now are able to use my webpage.

### Testing

By running `npm test` you can run all the tests using jest.

# Credits

## Frameworks/Tools
* [Git](https://git-scm.com/)
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
* Credits to Samantha Gades for her picture (found on [Unsplash](https://unsplash.com))
* Credits to Eric Nopanen for his picture (found on [Unsplash](https://unsplash.com))
* Credits to Etienne Boulanger for his picture (found on [Unsplash](https://unsplash.com))
* Credits to Cory Bouthillette for his picture (found on [Unsplash](https://unsplash.com))
* Credits to Mohammad Metri for his picture (found on [Unsplash](https://unsplash.com))
* Credits to [Michiocre](https://github.com/Michiocre) for the Backend Magic
* Credits to Treer for his icon (found on [openclipart](https://openclipart.org/detail/247324/abstract-user-icon-1))
