import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ITodoDetailsProp} from './TodoDetails.types';
import {useSelector} from 'react-redux';
import {selectTodoById} from '../../store/selectors';
import TextField from '../../components/TextField/TextField';
import {completedTodo} from '../../store/actions';
import {useAppDispatch} from '../../hooks/hooks';
import SaveButton from '../../components/SaveButton/SaveButton';

export const TodoDetails = ({route, navigation}: ITodoDetailsProp) => {
  const todo = useSelector(selectTodoById(route.params.todoId));
  const dispatch = useAppDispatch();
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleChangeTodo = () => {
    const newTodo = {
      ...todo,
      title: editedTitle,
    };

    dispatch(completedTodo(newTodo));
  };

  useEffect(() => {
    navigation.setOptions({
      title: todo.title,
    });
  }, [navigation, todo]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          disabled={editedTitle === todo.title}
          onPress={handleChangeTodo}
        />
      ),
    });
  }, [navigation, todo.title, editedTitle]);

  return (
    <>
      <TextField initialValue={todo.title} onChangeText={setEditedTitle} />
      <Text>Hello, {todo.title}</Text>
    </>
  );
};
