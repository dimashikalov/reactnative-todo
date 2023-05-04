import React from 'react';
import {View} from 'react-native';
import {ICheckboxProps} from './Checkbox.types';
import {styles} from './Checkbox.styles';

const Checkbox = ({checked}: ICheckboxProps) => {
  return <View style={[styles.box, checked && styles.checked]} />;
};

export default Checkbox;
