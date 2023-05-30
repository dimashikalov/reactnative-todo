import {ITodo} from '../screens/TodoList/TodoList.types';
import {TODOS_URL} from '../utils/constans';
import {Dispatch} from 'redux';
import {ITodosMap} from './types';

export const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_ERROR = 'GET_TODOS_ERROR';
export const CHANGED_TODO = 'CHANGED_TODO';
export const DELETED_TODO = 'DELETED_TODO';

export const getTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});
export const getTodosSuccess = (todos: ITodosMap) => ({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});
export const getTodosError = (err: any) => ({
  type: GET_TODOS_ERROR,
  payload: err,
});

export const changedTodo = (newTodo: ITodo) => ({
  type: CHANGED_TODO,
  payload: newTodo,
});
export const deletedTodo = (id: number) => ({
  type: DELETED_TODO,
  payload: id,
});

export const getTodos = () => (dispatch: Dispatch) => {
  fetch(TODOS_URL)
    .then<ITodo[]>(res => res.json())
    .then(data => {
      const todos = data.slice(0, 20).reduce<ITodosMap>((acc, el) => {
        acc[el.id] = {...el, imgs: []};
        return acc;
      }, {});
      dispatch(getTodosSuccess(todos));
    })
    .catch(e => dispatch(getTodosError(e)));
};
