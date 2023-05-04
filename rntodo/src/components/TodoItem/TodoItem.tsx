import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ITodoItemProps} from './TodoItem.types';
import {styles} from './TodoItem.styles';
import Checkbox from '../Checkbox/Checkbox';

export const TodoItem: FC<ITodoItemProps> = ({ind, todo, onCompleted}) => {
  const handlePress = () => {
    onCompleted(todo.id);
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.todoContainer}>
      <Checkbox checked={todo.completed} />
      <Text style={styles.todoText}>
        {ind + 1}: {todo.title}
      </Text>
    </TouchableOpacity>
  );
};
