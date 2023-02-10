export const authorizeUrl = 'https://accounts.spotify.com/authorize';
export const tokenUrl = 'https://accounts.spotify.com/api/token';
export const meUrl = 'https://api.spotify.com/v1/me';
export const getUsersPlaylistsUrl = (userId: string) =>
  `https://api.spotify.com/v1/users/${userId}/playlists`;
export const onePlaylistUrl = (playlistId: string) =>
  `https://api.spotify.com/v1/playlists/${playlistId}`;
export const postUsersPlaylistUrl = (userId: string) =>
  `https://api.spotify.com/v1/users/${userId}/playlists`;
export const addItemsToPlaylist = (playlistId: string) =>
  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
export const searchTracksUrl = (queryParam: string) =>
  `https://api.spotify.com/v1/search?q=${queryParam}&type=track&limit=5`;
