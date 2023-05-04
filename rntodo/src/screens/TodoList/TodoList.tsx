import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {styles} from './TodoList.styles';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {selectTodos} from '../../store/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {completedTodo, getTodos} from '../../store/actions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {FETCH_STATUSES} from '../../utils/constans';
import {ITodo} from './TodoList.types';

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

  return (
    <ScrollView style={styles.todoListContainer}>
      {Object.values(todos).map((todo, i) => (
        <TodoItem key={i} ind={i} todo={todo} onCompleted={handlePressTodo} />
      ))}
    </ScrollView>
  );
};

export default TodoList;
