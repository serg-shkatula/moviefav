import React from 'react';
import {MovieInfoPreview} from '../../types';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

const MoviePreview: React.FC<{
  style?: StyleProp<ViewStyle>;
  data: MovieInfoPreview;
  liked?: boolean;
  disliked?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
}> = ({style, data, liked, disliked, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const textColorStyle = {color: isDarkMode ? 'white' : 'black'};
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      <Image
        source={{uri: data.imageUrl}}
        style={styles.image}
        resizeMode={'cover'}
      />
      {liked && <Text style={styles.liked}>like</Text>}
      {disliked && <Text style={styles.disliked}>dislike</Text>}
      <View style={styles.info}>
        <Text style={textColorStyle}>{data.year}</Text>
        <Text style={[textColorStyle, styles.title, styles.wrap]}>
          {data.title}
        </Text>
        <Text style={[textColorStyle, styles.wrap]}>{data.cast}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  liked: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: '#fff',
    backgroundColor: '#f5c518',
    padding: 6,
  },
  disliked: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: '#fff',
    backgroundColor: 'red',
    padding: 6,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgrey',
  },
  info: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 6,
  },
  wrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default MoviePreview;
