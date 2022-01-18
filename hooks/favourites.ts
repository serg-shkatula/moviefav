import {FavouritesApi, MovieInfo, MovieInfoPreview} from '../types';
import {useEffect, useState} from 'react';
import {getData, storeData} from '../utils/storage';

const LIKED_MOVIES_STORAGE_KEY = 'liked';
const DISLIKED_MOVIES_STORAGE_KEY = 'disliked';

type FavsType = {liked: any[]; disliked: any[]};
let setFavouritesMethod:
  | ((setter: (data: FavsType) => FavsType) => void)
  | undefined;

const addLiked = async (movieInfo: MovieInfoPreview) => {
  const currentList = (await getData(LIKED_MOVIES_STORAGE_KEY)) as
    | MovieInfo[]
    | undefined;
  const updatedList = [
    ...(currentList || []).filter((m) => m.id !== movieInfo.id),
    movieInfo,
  ];
  await storeData(LIKED_MOVIES_STORAGE_KEY, updatedList);
  setFavouritesMethod?.((favs) => ({...favs, liked: updatedList}));
  return;
};
const removeLiked = async (movieId: string) => {
  const currentList = (await getData(LIKED_MOVIES_STORAGE_KEY)) as
    | MovieInfo[]
    | undefined;
  const updatedList = currentList?.filter((movie) => movie.id !== movieId);
  setFavouritesMethod?.((favs) => ({...favs, liked: updatedList || []}));
  return storeData(LIKED_MOVIES_STORAGE_KEY, updatedList);
};
const addDisliked = async (movieInfo: MovieInfoPreview) => {
  const currentList = (await getData(DISLIKED_MOVIES_STORAGE_KEY)) as
    | MovieInfo[]
    | undefined;
  const updatedList = [...(currentList || []), movieInfo];
  setFavouritesMethod?.((favs) => ({...favs, disliked: updatedList}));
  return storeData(DISLIKED_MOVIES_STORAGE_KEY, updatedList);
};
const removeDisliked = async (movieId: string) => {
  const currentList = (await getData(DISLIKED_MOVIES_STORAGE_KEY)) as
    | MovieInfo[]
    | undefined;
  const updatedList = currentList?.filter((movie) => movie.id !== movieId);
  setFavouritesMethod?.((favs) => ({...favs, disliked: updatedList || []}));
  return storeData(DISLIKED_MOVIES_STORAGE_KEY, updatedList);
};

const useFavouritesApi = (): FavouritesApi => {
  const [favourites, setFavourites] = useState<FavsType>({
    liked: [],
    disliked: [],
  });

  useEffect(() => {
    setFavouritesMethod = setFavourites;
    let unmounted = false;
    (async () => {
      const likedMovies = await getData(LIKED_MOVIES_STORAGE_KEY);
      const dislikedMovies = await getData(DISLIKED_MOVIES_STORAGE_KEY);
      if (unmounted) {
        return;
      }

      setFavourites({
        liked: likedMovies || [],
        disliked: dislikedMovies || [],
      });
    })();

    return () => {
      setFavouritesMethod = undefined;
      unmounted = true;
    };
  }, []);

  return {
    likedMovies: favourites.liked,
    dislikedMovies: favourites.disliked,
    addLiked,
    removeLiked,
    addDisliked,
    removeDisliked,
  };
};

export default {
  useFavourites: useFavouritesApi,
};
