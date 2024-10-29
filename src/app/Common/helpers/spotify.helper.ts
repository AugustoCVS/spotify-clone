import { IUser } from "../../interfaces/user";

export function DefineSpotifyUser({ user }: { user: SpotifyApi.CurrentUsersProfileResponse }): IUser {
  return {
    id: user.id,
    name: user.display_name || '',
    imageUrl: user.images?.pop()?.url || ''
  }
}