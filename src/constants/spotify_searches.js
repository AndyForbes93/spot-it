let build = true;

const scopes = "user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played";
const redirectURI = build ? "https://spot-it-app.herokuapp.com/" : "http://localhost:8080/";

export const clientID = "b0fb5138f23b47dca7b805456e7f2716";
export const clientSecret = "5fee16a1cb1145b18b3288322e1a7d15";
export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID
}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;
export const spotifyProfileURL = "https://api.spotify.com/v1/me?access_token=";
export const spotifyPlaylistURL = "https://api.spotify.com/v1/me/playlists?access_token=";
export const spotifySearchURL = "https://api.spotify.com/v1/search?q=";
export const spotifyArtistURL = "https://api.spotify.com/v1/artists/";
export const spotifyAlbumURL = "https://api.spotify.com/v1/albums/";
export const spotifyTopArtistURL = "https://api.spotify.com/v1/me/top/artists?access_token=";
