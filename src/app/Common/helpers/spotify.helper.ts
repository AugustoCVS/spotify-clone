import { IPlaylist } from "../../interfaces/playlist";
import { IUser } from "../../interfaces/user";

export function DefineSpotifyUser({ user }: { user: SpotifyApi.CurrentUsersProfileResponse }): IUser {
  return {
    id: user.id,
    name: user.display_name || '',
    imageUrl: user.images?.pop()?.url || ''
  }
}

export function DefineSpotifyPlaylist({ playlist }: { playlist: SpotifyApi.PlaylistObjectSimplified }): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images?.pop()?.url || ''
  }
}