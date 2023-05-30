import {TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ISaveButtonProps} from './SaveButton.types';
import {styles} from './SaveButton.styles';

const SaveButton = ({onPress, disabled}: ISaveButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Icon
        name="check"
        size={24}
        style={disabled ? styles.disabled : styles.icon}
      />
    </TouchableOpacity>
  );
};

export default SaveButton;
