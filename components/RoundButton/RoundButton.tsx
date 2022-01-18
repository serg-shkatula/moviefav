import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

const RoundButton: React.FC<{
  style?: StyleProp<ViewStyle>;
  label: string;
  highlighted?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
}> = ({style, label, onPress, highlighted}) => {
  return (
    <TouchableOpacity
      style={[styles.root, style, highlighted && {backgroundColor: '#f5c518'}]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 100,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
  },
});

export default RoundButton;
