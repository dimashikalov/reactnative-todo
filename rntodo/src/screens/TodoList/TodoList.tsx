import React, {useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import {styles} from './TodoList.styles';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {completedTodo, deletedTodo, getTodos} from '../../store/actions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {ITodo} from './TodoList.types';
import TextField from '../../components/TextField/TextField';

const TodoList = () => {
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.todoListContainer}>
      <TextField onSubmit={handleAddTodo} />
      {Object.values(todos).map((todo, i) => (
        <TodoItem
          key={i}
          ind={i}
          todo={todo}
          onCompleted={handlePressTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
      {status === 'error' && <Text>Error</Text>}
    </ScrollView>
  );
};

export default TodoList;
