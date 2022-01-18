import React, {useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {RoundButton} from '../RoundButton';

const SearchField: React.FC<{
  style?: StyleProp<ViewStyle>;
  value?: string;
  isInFullMovieView?: boolean;
  onFocus?: () => void;
  onChangeText?: TextInputProps['onChangeText'];
}> = ({style, value, isInFullMovieView, onFocus, onChangeText}) => {
  const handleClearPress = useCallback(() => {
    onChangeText?.('');
  }, [onChangeText]);

  const isDarkMode = useColorScheme() === 'dark';

  const content = (
    <View
      style={[
        styles.root,
        style,
        {backgroundColor: isDarkMode ? 'black' : 'white'},
      ]}
    >
      <TextInput
        style={[styles.input, {color: isDarkMode ? 'white' : 'black'}]}
        onChangeText={onChangeText}
        value={isInFullMovieView ? '' : value}
        placeholder={isInFullMovieView ? '← back' : 'search...'}
        placeholderTextColor={'#777'}
        editable={!isInFullMovieView}
        onFocus={onFocus}
      />
      {!!value && !isInFullMovieView && (
        <RoundButton
          style={styles.clearButton}
          label="X"
          onPress={handleClearPress}
        />
      )}
    </View>
  );

  return isInFullMovieView ? (
    <TouchableOpacity style={{flex: 1}} onPress={onFocus}>
      <View pointerEvents={'none'}>{content}</View>
    </TouchableOpacity>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 5,
    marginLeft: 6,
    marginRight: 6,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  clearButton: {
    width: 40,
    height: 40,
  },
});

export default SearchField;
