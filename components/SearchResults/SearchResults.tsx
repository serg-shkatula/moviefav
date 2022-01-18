import React from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {HorizontalSwipe} from '../HorizontalSwipe';
import {MoviePreview} from '../MoviePreview';
import {FavouritesApi, MovieInfo} from '../../types';

const matchId = (id: string) => (m: MovieInfo) => m.id === id;

const SearchResults: React.FC<{
  style?: StyleProp<ViewStyle>;
  favsApi: FavouritesApi;
  results: MovieInfo[];
  onMovieLike: (movie: MovieInfo) => void;
  onMovieDislike: (movie: MovieInfo) => void;
  onSelect: (id: string) => void;
}> = ({style, results, favsApi, onMovieLike, onMovieDislike, onSelect}) => {
  return (
    <ScrollView
      style={style}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode={'on-drag'}
      keyboardShouldPersistTaps={'handled'}
    >
      <View style={styles.previewsContainer}>
        {results?.map((item) => (
          <HorizontalSwipe
            key={item.id}
            style={styles.previewItem}
            rightLabel="Nay..."
            leftLabel="Yay!"
            onSwipeRight={() => onMovieLike(item)}
            onSwipeLeft={() => onMovieDislike(item)}
          >
            <MoviePreview
              data={item}
              onPress={() => onSelect(item.id)}
              liked={!!favsApi.likedMovies.find(matchId(item.id))}
              disliked={!!favsApi.dislikedMovies.find(matchId(item.id))}
            />
          </HorizontalSwipe>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {},
  previewsContainer: {
    paddingTop: 24,
    paddingBottom: 96,
  },
  previewItem: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
});

export default SearchResults;
