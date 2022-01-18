/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import api from './hooks/api';
import {MovieInfoPreview} from './types';
import {MovieFullInfo} from './components/MovieFullInfo';
import {RoundButton} from './components/RoundButton';
import {SearchField} from './components/SearchField';
import {Favourites} from './components/Favourites';
import favourites from './hooks/favourites';
import {SearchResults} from './components/SearchResults';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<MovieInfoPreview[]>();
  const [selectedMovie, setSelectedMovie] = useState<MovieInfoPreview>();

  const favouritesApi = favourites.useFavourites();
  const {
    likedMovies,
    dislikedMovies,
    addLiked,
    addDisliked,
    removeLiked,
    removeDisliked,
  } = favouritesApi;
  const likedIds = likedMovies.map((m) => m.id);
  const dislikedIds = dislikedMovies.map((m) => m.id);
  const dislikedIdsRef = useRef(dislikedIds);
  dislikedIdsRef.current = dislikedIds;

  api.useSearch((res) => {
    setSearchResults(
      res
        ?.filter((item) => !!item.y && !dislikedIds.includes(item.id))
        .map<MovieInfoPreview>((item) => ({
          imageUrl: item.i?.imageUrl,
          title: item.l,
          cast: item.s,
          year: item.y,
          id: item.id,
        })),
    );
  }, searchText);

  useEffect(() => {
    setSelectedMovie(undefined);
  }, [searchResults]);

  const handleMovieSelect = useCallback(
    (id: string) => {
      Keyboard.dismiss();
      setSelectedMovie(searchResults?.find((r) => r.id === id));
    },
    [searchResults],
  );

  const handleSearchFieldFocus = useCallback(() => {
    setSelectedMovie(undefined);
  }, []);

  const handleSearchTextChange = useCallback((text: string) => {
    if (!text) {
      setSearchResults(undefined);
    }
    setSearchText(text);
  }, []);

  const handleYayPress = useCallback(() => {
    if (!selectedMovie) {
      return;
    }
    if (dislikedIds.includes(selectedMovie.id)) {
      removeDisliked(selectedMovie.id);
    }
    !likedIds.includes(selectedMovie.id)
      ? addLiked(selectedMovie)
      : removeLiked(selectedMovie.id);
  }, [
    selectedMovie,
    addLiked,
    removeLiked,
    removeDisliked,
    dislikedIds,
    likedIds,
  ]);
  const handleNayPress = useCallback(() => {
    if (!selectedMovie) {
      return;
    }
    if (likedIds.includes(selectedMovie.id)) {
      removeLiked(selectedMovie.id);
    }
    !dislikedIds.includes(selectedMovie.id)
      ? addDisliked(selectedMovie)
      : removeDisliked(selectedMovie.id);
  }, [
    selectedMovie,
    addDisliked,
    removeDisliked,
    likedIds,
    removeLiked,
    dislikedIds,
  ]);
  const handleMovieLike = useCallback(
    (movieData) => addLiked(movieData),
    [addLiked],
  );
  const handleMovieDislike = useCallback(
    (movieData) => addDisliked(movieData),
    [addDisliked],
  );

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <KeyboardAvoidingView behavior={'height'}>
      {selectedMovie && (
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: selectedMovie.imageUrl}}
          resizeMode={'cover'}
          blurRadius={24}
        />
      )}
      <SafeAreaView>
        <StatusBar />
        <View style={styles.root}>
          {selectedMovie ? (
            <MovieFullInfo data={selectedMovie} />
          ) : searchResults?.length ? (
            <SearchResults
              results={searchResults}
              onSelect={handleMovieSelect}
              favsApi={favouritesApi}
              onMovieLike={handleMovieLike}
              onMovieDislike={handleMovieDislike}
            />
          ) : searchText ? (
            <ScrollView
              contentContainerStyle={styles.noResults}
              keyboardDismissMode={'on-drag'}
            >
              <Text style={isDarkMode && {color: 'white'}}>
                {searchResults ? 'No results 🤷‍♂' : 'Searching...'}️
              </Text>
            </ScrollView>
          ) : (
            <Favourites
              likedMovies={likedMovies}
              removeLiked={removeLiked}
              dislikedMovies={dislikedMovies}
              removeDisliked={removeDisliked}
              onSelected={setSelectedMovie}
            />
          )}
          <View style={styles.bottomControlsContainer}>
            {selectedMovie && (
              <RoundButton
                label="Nay"
                style={styles.yayNayButton}
                onPress={handleNayPress}
                highlighted={dislikedIds.includes(selectedMovie.id)}
              />
            )}
            <SearchField
              style={styles.searchField}
              value={searchText}
              isInFullMovieView={!!selectedMovie}
              onFocus={handleSearchFieldFocus}
              onChangeText={handleSearchTextChange}
            />
            {selectedMovie && (
              <RoundButton
                label="Yay!"
                style={styles.yayNayButton}
                onPress={handleYayPress}
                highlighted={likedIds.includes(selectedMovie.id)}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  imageBackground: {
    position: 'absolute',
    opacity: 0.3,
    width: '100%',
    height: '100%',
  },
  bottomControlsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  searchField: {
    height: 50,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yayNayButton: {
    height: 50,
    width: 50,
  },
});

export default App;
