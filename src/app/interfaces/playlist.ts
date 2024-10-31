import { IMusic } from "./music";

export interface IPlaylist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}