import React, {useCallback} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

const MIN_SCROLL_OFFSET = 60;

const HorizontalSwipe: React.FC<{
  style?: StyleProp<ViewStyle>;
  rightLabel?: string;
  leftLabel?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}> = ({children, style, rightLabel, leftLabel, onSwipeLeft, onSwipeRight}) => {
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.x > MIN_SCROLL_OFFSET) {
        onSwipeLeft?.();
      } else if (e.nativeEvent.contentOffset.x < -MIN_SCROLL_OFFSET) {
        onSwipeRight?.();
      }
    },
    [onSwipeRight, onSwipeLeft],
  );

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.root}>
      <Text style={styles.yayText}>{leftLabel}</Text>
      <Text style={styles.nayText}>{rightLabel}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          width: '100%',
          backgroundColor: isDarkMode ? 'black' : 'white',
        }}
        onScrollEndDrag={handleScroll}
      >
        <View style={[styles.childrenContainer, style]}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  childrenContainer: {
    width: '100%',
  },
  yayText: {
    fontSize: 18,
    position: 'absolute',
    left: 24,
  },
  nayText: {
    fontSize: 18,
    position: 'absolute',
    right: 24,
  },
});

export default HorizontalSwipe;
