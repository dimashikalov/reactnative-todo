import {ITodo} from '../screens/TodoList/TodoList.types';
import {TODOS_URL} from '../utils/constans';
import {Dispatch} from 'redux';

export const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_ERROR = 'GET_TODOS_ERROR';

export const getTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});
export const getTodosSuccess = (todos: ITodo[]) => ({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});
export const getTodosError = (err: any) => ({
  type: GET_TODOS_ERROR,
  payload: err,
});

export const getTodos = () => (dispatch: Dispatch) => {
  fetch(TODOS_URL)
    .then(res => res.json())
    .then(data => dispatch(getTodosSuccess(data.slice(0, 20))))
    .catch(e => dispatch(getTodosError(e)));
};
