import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ITodoDetailsProp} from './TodoDetails.types';
import {useSelector} from 'react-redux';
import {selectTodoById} from '../../store/selectors';
import TextField from '../../components/TextField/TextField';
import {changedTodo} from '../../store/actions';
import {useAppDispatch} from '../../hooks/hooks';
import SaveButton from '../../components/SaveButton/SaveButton';
import {Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export const TodoDetails = ({route, navigation}: ITodoDetailsProp) => {
  const todo = useSelector(selectTodoById(route.params.todoId));
  const dispatch = useAppDispatch();
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleChangeTodo = () => {
    const newTodo = {
      ...todo,
      title: editedTitle,
    };

    dispatch(changedTodo(newTodo));
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

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
      },
      ({assets}) => {
        if (assets) {
          const newTodo = {
            ...todo,
            imgs: [...todo.imgs, ...assets],
          };
          dispatch(changedTodo(newTodo));
        }
      },
    );
  };

  return (
    <>
      <TextField initialValue={todo.title} onChangeText={setEditedTitle} />
      <Text>{todo.title}</Text>
      <Button title="Select Image" onPress={handleSelectImage} />
    </>
  );
};
