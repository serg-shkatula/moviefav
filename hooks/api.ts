import {useEffect} from 'react';

const SEARCH_CALL_DEBOUNCE = 600;

const useSearch = (onResult: (r?: any[]) => void, text: string) =>
  useEffect(() => {
    const trimmedText = text.trim().toLowerCase();
    if (!trimmedText) {
      onResult(undefined);
      return;
    }
    let unmounted = false;
    setTimeout(async () => {
      if (unmounted) {
        return;
      }

      const url = `https://v2.sg.media-imdb.com/suggestion/${trimmedText[0]}/${trimmedText}.json`;
      const res = await fetch(url);
      const json = await res.json();
      if (unmounted) {
        return;
      }

      onResult(json.d);
    }, SEARCH_CALL_DEBOUNCE);
    return () => {
      unmounted = true;
    };
  }, [text]);

const useMovieInfo = (onResult: (r: any) => void, id?: string) => {
  useEffect(() => {
    if (!id) {
      onResult(undefined);
      return;
    }
    let unmounted = false;
    (async () => {
      const url = `https://www.omdbapi.com/?i=${id}&apikey=c40d69fd`;
      const res = await fetch(url);
      const json = await res.json();
      if (unmounted) {
        return;
      }
      onResult(json);
    })();
    return () => {
      unmounted = true;
    };
  }, [id]);
};

export default {
  useSearch,
  useMovieInfo,
};
