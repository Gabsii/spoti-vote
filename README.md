# spoti-vote
Web application to vote for the next song in Spotify Queue

# Project Description:

The idea for this project resulted as we have a Spotify class playlist with great songs we listen to in our breaks.
The problem with it was that Spotify's shuffling feature didn't please the majority of the class.
To solve this problem I thought about creating a website where users could choose between four to eight songs (depending on the settings). The song with the most votes would be added to the queue as next song.

## Requirements:
* [Node v6.0 and higher](https://nodejs.org/en/)
* [Spotify Premium Account](https://www.spotify.com/at/) for the DJ

## Usage

To use my webpage, you first want to download [NodeJS](https://nodejs.org/en/).
Then clone my repository using:
`git clone https://github.com/Gabsii/spoti-vote.git`

The following Environment Variables are key for the usage of this app. You want to set them using `SET` on Windows or `EXPORT` on a OSX. If this doesn't work try to set them in `/etc/environment`.

`PORT=80`\
`ADDRESS="localhost"`\
`SPOTIFY_CLIENT_ID="FOO"`\
`SPOTIFY_CLIENT_SECRET="BAR"`

After successfully cloning the repository, you want to startup a commandline in its folder and run `npm install` in:

`.`\
`+-- spoti-vote`\
`|   +-- execute command here`\
`+-- spoti-vote-backend`\
`|   +-- execute command here`

then manover back to the root folder and run:

`npm install pm2 -g`\
`pm2 start ecosystem.config.js`

If you can't run a port below 1024 without root permission see [this](http://pm2.keymetrics.io/docs/usage/specifics/).
Thanks to [MPJ](https://github.com/mpj/oauth-bridge-template) for providing a framework for the backend-logic.

Congratulations! You now are able to use my webpage.

# Credits

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
* Credits to Samantha Gades for her picture (found on [Unsplash](https://unsplash.com))
* Credits to Eric Nopanen for his picture (found on [Unsplash](https://unsplash.com))
* Credits to Etienne Boulanger for his picture (found on [Unsplash](https://unsplash.com))
* Credits to Cory Bouthillette for his picture (found on [Unsplash](https://unsplash.com))
* Credits to [Michiocre](https://github.com/Michiocre) for the Logo and Button Animation
* Credits to Treer for his icon (found on [openclipart](https://openclipart.org/detail/247324/abstract-user-icon-1))
