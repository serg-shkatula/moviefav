export type MovieInfoPreview = {
  imageUrl: string;
  title: string;
  cast: string;
  year: string;
  id: string;
};
export type MovieInfo = MovieInfoPreview & {
  plot?: string;
  rating?: string;
};
export type FavouritesApi = {
  likedMovies: MovieInfo[];
  dislikedMovies: MovieInfo[];
  addLiked: (movie: MovieInfo) => void;
  removeLiked: (id: string) => void;
  addDisliked: (movie: MovieInfo) => void;
  removeDisliked: (id: string) => void;
};
// export enum AppState {
//   favourites,
//   searching,
//   searchResults,
//   movieInfo,
// }
