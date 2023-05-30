import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './TextField.styles';
import {ITextFieldProps} from './TextField.types';

const TextField = ({
  onSubmit,
  initialValue = '',
  onChangeText,
}: ITextFieldProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    if (value) {
      onSubmit && onSubmit(value);
      if (!initialValue) {
        setValue('');
      }
    }
  };

  const handleCheckText = (text: string) => {
    setValue(text);
    onChangeText && onChangeText(text);
  };

  return (
    <TextInput
      placeholder="Enter text..."
      style={styles.textField}
      value={value}
      onChangeText={handleCheckText}
      onSubmitEditing={handleSubmit}
    />
  );
};

export default TextField;
