import React, {useRef} from 'react';
import {View, Animated, TouchableOpacity, Easing} from 'react-native';
import {ICheckboxProps} from './Checkbox.types';
import {styles} from './Checkbox.styles';

const Checkbox = ({checked, onPress}: ICheckboxProps) => {
  const checkboxScale = useRef(new Animated.Value(0));
  const handlePress = () => {
    Animated.spring(checkboxScale.current, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      checkboxScale.current.setValue(0);
      onPress();
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.box,
          checked && styles.checked,
          {
            transform: [
              {
                scale: checkboxScale.current.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.6, 1],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default Checkbox;
