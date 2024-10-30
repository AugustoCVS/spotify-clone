import { IArtist } from "../../interfaces/artists";
import { IMusic } from "../../interfaces/music";
import { IPlaylist } from "../../interfaces/playlist";
import { IUser } from "../../interfaces/user";
import { newArtist, newMusic, newPlaylist } from "../spotify.factories";

export function DefineSpotifyUser({ user }: { user: SpotifyApi.CurrentUsersProfileResponse }): IUser {
  return {
    id: user.id,
    name: user.display_name || '',
    imageUrl: user.images?.pop()?.url || ''
  }
}

export function DefineSpotifyPlaylist({ playlist }: { playlist: SpotifyApi.PlaylistObjectSimplified }): IPlaylist {
  if (!playlist) return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name || 'Sem Nome',
    imageUrl: playlist.images?.pop()?.url || ''
  }
}

export function DefineSpotifyArtist({ artist }: { artist: SpotifyApi.ArtistObjectFull }): IArtist {
  if (!artist) return newArtist();

  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images?.sort((a, b) => a.width! - b.width!).pop()?.url || ''
  }
}

export function DefineSpotifyTrack({ track }: { track: SpotifyApi.TrackObjectFull }): IMusic {
  if (!track) return newMusic();

  return {
    id: track.id,
    title: track.name,
    album: {
      id: track.album.id,
      imgUrl: track.album.images?.sort((a, b) => a.width! - b.width!).pop()?.url || '',
      name: track.album.name
    },
    artists: track.artists.map(artist => ({
      id: artist.id,
      name: artist.name
    })),
    time: ''
  }
}