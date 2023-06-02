import {View, Text, ScrollView, Switch} from 'react-native';
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
  RepeatFrequency,
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

  const handleSetPush = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default',
      importance: AndroidImportance.HIGH,
    });

    const date = new Date();
    date.setHours(12);
    date.setMinutes(10);
    date.setSeconds(0);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
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
        },
        data: {
          id: todo.id,
        },
      },
      trigger,
    );
  };

  const handleCancelPush = async () => {
    await notifee.cancelTriggerNotification(todo.id.toString());
  };

  const handleSwitch = async () => {
    if (todo.notificationIsOn) {
      await handleCancelPush();
    } else {
      await handleSetPush();
    }

    dispatch(changedTodo({...todo, notificationIsOn: !todo.notificationIsOn}));
  };

  return (
    <ScrollView>
      <View>
        <Text>Notification</Text>
        <Switch value={todo.notificationIsOn} onChange={handleSwitch} />
      </View>
      <TextField initialValue={todo.title} onChangeText={setEditedTitle} />
      <Text>{todo.title}</Text>
      <Gallery onPress={handleImagePress} imgs={todo.imgs} />
      <Button title="Select Image" onPress={handleSelectImage} />
    </ScrollView>
  );
};
