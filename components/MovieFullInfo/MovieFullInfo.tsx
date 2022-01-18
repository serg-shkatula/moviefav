import React, {useEffect, useRef, useState} from 'react';
import {MovieInfo, MovieInfoPreview} from '../../types';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import api from '../../hooks/api';

const MovieFullInfo: React.FC<{
  style?: StyleProp<ViewStyle>;
  data: MovieInfoPreview;
  onPress?: TouchableOpacityProps['onPress'];
}> = ({style, data}) => {
  const [fullData, setFullData] = useState<MovieInfo>(data);
  const isLoadingRef = useRef(true);
  const isLoading = isLoadingRef.current;

  api.useMovieInfo((res) => {
    isLoadingRef.current = false;
    setFullData((currentData) => ({
      ...currentData,
      plot: res.Plot,
      rating: res.imdbRating,
    }));
  }, data.id);

  const isDarkMode = useColorScheme() === 'dark';
  const textColorStyle = {color: isDarkMode ? 'white' : 'black'};

  return (
    <ScrollView
      style={[styles.root, style]}
      // contentContainerStyle={{height: '100%'}}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{uri: data.imageUrl}}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, textColorStyle]}>
          {fullData.title}
          {fullData.rating && (
            <View style={styles.ratingWrapper}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{fullData.rating}</Text>
              </View>
            </View>
          )}
        </Text>
        <Text style={textColorStyle}>
          {fullData.year} ‧ {fullData.cast}
        </Text>
        {isLoading ? (
          <ActivityIndicator style={styles.activityIndicator} size={'small'} />
        ) : (
          <Text style={[styles.plot, textColorStyle]}>
            {fullData.plot} {fullData.plot}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  imageWrapper: {
    height: 400,
    width: '100%',
    padding: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    // flex: 1,
    padding: 24,
    paddingBottom: 96,
  },
  title: {
    fontSize: 24,
    marginBottom: 3,
    paddingRight: 24,
  },
  plot: {
    marginTop: 12,
  },
  activityIndicator: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  ratingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 6,
  },
  rating: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#f5c518',
  },
  ratingText: {
    fontSize: 11,
    color: 'white',
    margin: 4,
  },
});

export default MovieFullInfo;
