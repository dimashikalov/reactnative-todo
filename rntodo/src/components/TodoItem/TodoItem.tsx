import React, {FC} from 'react';
import {Text} from 'react-native';
import {ITodoItemProps} from './TodoItem.types';
import {styles} from './TodoItem.styles';

export const TodoItem: FC<ITodoItemProps> = ({ind, todo}) => {
  return (
    <Text style={styles.todoText}>
      {ind + 1}: {todo.title}
    </Text>
  );
};
