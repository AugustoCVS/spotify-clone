import { IArtist } from "../interfaces/artists";
import { IMusic } from "../interfaces/music";
import { IPlaylist } from "../interfaces/playlist";


export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: [],
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
  }
}

export function newMusic(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      imgUrl: '',
      name: '',
    },
    artists: [],
    time: '',
    title: '',
  }
}
