import {ITodo} from '../screens/TodoList/TodoList.types';
import {FETCH_STATUSES} from '../utils/constans';

export type ITodosMap = {
  [id: number]: ITodo;
};

export interface ITodosState {
  todos: ITodosMap;
  status: FETCH_STATUSES;
}

export type IGetTodosRequestAction = {
  type: string;
};
export type IGetTodosSuccessAction = {
  type: string;
  payload: ITodosMap;
};
export type IGetTodosErrorAction = {
  type: string;
  payload: any;
};

export type ICompletedTodoAction = {
  type: string;
  payload: ITodo;
};

export type IAction =
  | IGetTodosRequestAction
  | IGetTodosSuccessAction
  | IGetTodosErrorAction
  | ICompletedTodoAction;
