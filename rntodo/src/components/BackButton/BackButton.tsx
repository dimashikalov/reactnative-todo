import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {IBackButtonProps} from './BackButton.types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './BackButton.styles';

const BackButton = ({onPress}: IBackButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="chevron-circle-left" style={styles.icon} size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
