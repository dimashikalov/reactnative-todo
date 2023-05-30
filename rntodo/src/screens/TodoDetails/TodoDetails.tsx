import {View, Text} from 'react-native';
import React from 'react';
import {ITodoDetailsProp} from './TodoDetails.types';
import {useSelector} from 'react-redux';
import {selectTodoById} from '../../store/selectors';

export const TodoDetails = ({route}: ITodoDetailsProp) => {
  const todo = useSelector(selectTodoById(route.params.todoId));
  return (
    <View>
      <Text>Hello, {todo.title}</Text>
    </View>
  );
};
