import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './TextField.styles';
import {ITextFieldProps} from './TextField.types';

const TextField = ({onSubmit}: ITextFieldProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };
  return (
    <TextInput
      placeholder="Enter text..."
      style={styles.textField}
      value={value}
      onChangeText={setValue}
      onSubmitEditing={handleSubmit}
    />
  );
};

export default TextField;
