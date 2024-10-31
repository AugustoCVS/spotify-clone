import { IMusic } from "./music";

export interface IArtist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}