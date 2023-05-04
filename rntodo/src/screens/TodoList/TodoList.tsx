import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {styles} from './TodoList.styles';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {selectTodos} from '../../store/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {getTodos} from '../../store/actions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {FETCH_STATUSES} from '../../utils/constans';

const TodoList = () => {
  // const todos = useSelector(selectTodos);
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <ScrollView style={styles.todoListContainer}>
      {todos.map((todo, i) => (
        <TodoItem key={i} ind={i} todo={todo} />
      ))}
    </ScrollView>
  );
};

export default TodoList;
