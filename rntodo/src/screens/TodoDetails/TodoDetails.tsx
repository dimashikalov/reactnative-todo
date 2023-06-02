import {View, Text, ScrollView} from 'react-native';
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
import Gallery from '../../components/Gallary/Gallary';
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

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

  const handleImagePress = (imgUri?: string) => {
    navigation.navigate('ImgFull', {uri: imgUri || '', todoId: todo.id});
  };

  const sendPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'dimas',
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });

    //вариант обычного запуска локального уведомления
    // await notifee.displayNotification({
    //   title: 'Dimas is Number 1!',
    //   body: 'Param param param',
    //   android: {
    //     channelId,
    //     importance: AndroidImportance.HIGH,
    //   },
    // });

    //вариант отложенного вызова уведомления
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000,
    };

    await notifee.createTriggerNotification(
      {
        title: 'Trigger Notification',
        body: `${todo.title}`,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
          actions: [
            {
              title: 'Action',
              pressAction: {
                id: 'action1',
              },
            },
            {
              title: 'Action2',
              pressAction: {
                id: 'action2',
              },
            },
          ],
        },
        data: {
          id: todo.id,
        },
      },
      trigger,
    );
  };

  return (
    <ScrollView>
      <Button title="Send push" onPress={sendPush} />
      <TextField initialValue={todo.title} onChangeText={setEditedTitle} />
      <Text>{todo.title}</Text>
      <Gallery onPress={handleImagePress} imgs={todo.imgs} />
      <Button title="Select Image" onPress={handleSelectImage} />
    </ScrollView>
  );
};
