import React, {useEffect, useMemo} from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  SectionList,
  Text,
} from 'react-native';
import notifee, {
  AndroidImportance,
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {styles} from './TodoList.styles';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {changedTodo, deletedTodo, getTodos} from '../../store/actions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {ITodo, ITodoListProps} from './TodoList.types';
import TextField from '../../components/TextField/TextField';

const TodoList = ({navigation}: ITodoListProps) => {
  // const todos = useSelector(selectTodos);
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, []);

  const handlePressTodo = (id: number) => {
    const changeTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(changedTodo(changeTodo));
  };

  const handleAddTodo = (text: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      completed: false,
      title: text,
      imgs: [],
      notificationIsOn: false,
    };

    dispatch(changedTodo(newTodo));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deletedTodo(id));
  };

  const toDetails = (id: number) => {
    navigation.navigate('TodoDetails', {todoId: id});
  };
  //ф-ция для рендера компонента в FlatList
  const renderItem = ({item, index}: ListRenderItemInfo<ITodo>) => (
    <TodoItem
      key={item.id}
      ind={index}
      todo={item}
      onCompleted={handlePressTodo}
      onDelete={handleDeleteTodo}
      onPress={toDetails}
    />
  );

  //ф-ция для отображения 2х списков для SectionList
  const sections = useMemo(() => {
    return Object.values(todos).reduce<{
      completed: ITodo[];
      notCompleted: ITodo[];
    }>(
      (acc, el) => {
        el.completed ? acc.completed.push(el) : acc.notCompleted.push(el);
        return acc;
      },
      {
        completed: [],
        notCompleted: [],
      },
    );
  }, [todos]);

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
        body: 'Somebody',
        android: {
          channelId,
          ongoing: true,
          importance: AndroidImportance.HIGH,
          asForegroundService: true,
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
          id: '1',
        },
      },
      trigger,
    );
  };

  const isAppOpenedByNotif = async () => {
    const initNotif = await notifee.getInitialNotification();
    if (initNotif) {
      const id = initNotif.notification.data?.id;
      navigation.navigate('TodoDetails', {
        todoId: +(id as string),
      });
    }

    console.log('initNotif ', initNotif);
  };

  useEffect(() => {
    isAppOpenedByNotif();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        case EventType.ACTION_PRESS:
          console.log('detail ', detail.pressAction?.id);
      }
    });
  }, []);

  const StopService = () => {
    notifee.stopForegroundService();
  };

  return (
    //виртуализованные списки
    //обычный ScrollView не может отображать большое кол-во эл-ов, т.к рендерит сразу все эл-ты и занимает этим всю память
    // <ScrollView
    //   contentContainerStyle={styles.container}
    //   style={styles.todoListContainer}>
    //   <TextField onSubmit={handleAddTodo} />
    //   {Object.values(todos).map((todo, i) => (
    //     <TodoItem
    //       key={i}
    //       ind={i}
    //       todo={todo}
    //       onCompleted={handlePressTodo}
    //       onDelete={handleDeleteTodo}
    //     />
    //   ))}
    //   {status === 'error' && <Text>Error</Text>}
    // </ScrollView>

    //FlatList умеет отображать большое кол-во эл-ов, отображая часть эл-ов и исп-я очищение памяти для неисп. эл-ов
    // <FlatList
    //   contentContainerStyle={styles.container}
    //   style={styles.todoListContainer}
    //   ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
    //   data={Object.values(todos)}
    //   renderItem={renderItem}
    // />
    <>
      <Button title="Send push" onPress={sendPush} />
      <Button title="Stop service" onPress={StopService} />
      {/* <SectionList
        contentContainerStyle={styles.container}
        style={styles.todoListContainer}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        renderItem={renderItem}
        sections={[
          {title: 'Completed', data: sections.completed},
          {title: 'Not Completed', data: sections.notCompleted},
        ]}
        renderSectionHeader={({section}) => <Text>{section.title}</Text>}
      /> */}

      <FlatList
        contentContainerStyle={styles.container}
        style={styles.todoListContainer}
        ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
        data={Object.values(todos)}
        renderItem={renderItem}
      />
    </>
  );
};

export default TodoList;
