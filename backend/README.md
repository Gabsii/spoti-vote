# Spoti-vote Backend

## Development mode

In order to start developing, register a Spotify Application here:
https://developer.spotify.com/my-applications

On that page, add http://localhost:8888 as a callback url (don't forget to hit save at the bottom of the page)

Copy `.env.template`, rename it to `.env` and edit it too change the port and address of the frontend. You also have to enter your spotify application credentials.

```
PORT=80
PORTBACK=8888
ADDRESS="localhost"
SPOTIFY_CLIENT_ID="xxxxxxxxxxxxxxxxxxxxxxxxxx"
SPOTIFY_CLIENT_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Then go to your spoti-vote frontend in your browser and hit the login button. This will initiate the login flow and finally redirect to the Spotify login page where you can authorize this application to access your data. The Spotify API will provide a token, which will be stored on the server.
