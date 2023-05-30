import React, {useEffect, useMemo} from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  SectionList,
  Text,
} from 'react-native';
import {styles} from './TodoList.styles';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {completedTodo, deletedTodo, getTodos} from '../../store/actions';
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
    const changedTodo = {...todos[id], completed: !todos[id].completed};
    dispatch(completedTodo(changedTodo));
  };

  const handleAddTodo = (text: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      completed: false,
      title: text,
    };

    dispatch(completedTodo(newTodo));
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

    <SectionList
      contentContainerStyle={styles.container}
      style={styles.todoListContainer}
      ListHeaderComponent={() => <TextField onSubmit={handleAddTodo} />}
      renderItem={renderItem}
      sections={[
        {title: 'Completed', data: sections.completed},
        {title: 'Not Completed', data: sections.notCompleted},
      ]}
      renderSectionHeader={({section}) => <Text>{section.title}</Text>}
    />
  );
};

export default TodoList;
