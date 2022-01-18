import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {MoviePreview} from '../MoviePreview';
import {HorizontalSwipe} from '../HorizontalSwipe';
import {MovieInfo} from '../../types';

let isDislikesShownCached = false;

const ListWithLabel: React.FC<{
  movies: MovieInfo[];
  label: string;
  isDarkMode?: boolean;
  onRemove?: (movie: MovieInfo) => void;
  onSelect?: (movie: MovieInfo) => void;
}> = ({children, movies, label, isDarkMode, onRemove, onSelect}) => (
  <View style={styles.list}>
    <Text
      style={[
        styles.previewItem,
        {fontSize: 16, color: isDarkMode ? 'white' : 'black'},
      ]}
    >
      {label}
    </Text>
    {movies?.map((movie) => (
      <HorizontalSwipe
        key={movie.id}
        style={styles.previewItem}
        rightLabel="remove"
        onSwipeLeft={onRemove ? () => onRemove(movie) : undefined}
      >
        <MoviePreview
          data={movie}
          onPress={onSelect ? () => onSelect(movie) : undefined}
        />
      </HorizontalSwipe>
    ))}
    {children}
  </View>
);

const Favourites: React.FC<{
  style?: StyleProp<ViewStyle>;
  likedMovies: MovieInfo[];
  removeLiked: (id: string) => void;
  dislikedMovies: MovieInfo[];
  removeDisliked: (id: string) => void;
  onSelected?: (movieData: MovieInfo) => void;
}> = ({
  style,
  likedMovies,
  dislikedMovies,
  removeLiked,
  removeDisliked,
  onSelected,
}) => {
  const [isDislikesShown, setIsDislikesShown] = useState(isDislikesShownCached);

  const handleRemoveLiked = useCallback<(m: MovieInfo) => void>(
    (movieData) => {
      removeLiked(movieData.id);
    },
    [removeLiked],
  );
  const handleRemoveDisliked = useCallback<(m: MovieInfo) => void>(
    (movieData) => {
      removeDisliked(movieData.id);
    },
    [removeDisliked],
  );
  const handleShowHideDislikes = useCallback(
    () => setIsDislikesShown((val) => !val),
    [],
  );

  const isDarkMode = useColorScheme() === 'dark';

  isDislikesShownCached = isDislikesShown;

  return (
    <ScrollView style={[styles.root, style]} keyboardDismissMode={'on-drag'}>
      <View style={{marginBottom: 96}}>
        <ListWithLabel
          movies={likedMovies}
          label={'You liked:'}
          onRemove={handleRemoveLiked}
          onSelect={onSelected}
          isDarkMode={isDarkMode}
        />
        <ListWithLabel
          movies={isDislikesShown ? dislikedMovies : []}
          label={"You didn't like:"}
          onRemove={handleRemoveDisliked}
          onSelect={onSelected}
          isDarkMode={isDarkMode}
        >
          <TouchableOpacity
            style={styles.showDislikedButton}
            onPress={handleShowHideDislikes}
          >
            <Text>{isDislikesShown ? 'hide' : 'show'}</Text>
          </TouchableOpacity>
        </ListWithLabel>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 24,
  },
  list: {
    marginBottom: 24,
  },
  previewItem: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  showDislikedButton: {
    position: 'absolute',
    top: 0,
    right: 24,
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    marginTop: -3,
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default Favourites;
