import {ITodo} from '../screens/TodoList/TodoList.types';
import {FETCH_STATUSES} from '../utils/constans';

export interface ITodosState {
  todos: ITodo[];
  status: FETCH_STATUSES;
}

export type IGetTodosRequestAction = {
  type: string;
};
export type IGetTodosSuccessAction = {
  type: string;
  payload: ITodo[];
};
export type IGetTodosErrorAction = {
  type: string;
  payload: any;
};

export type IAction =
  | IGetTodosRequestAction
  | IGetTodosSuccessAction
  | IGetTodosErrorAction;
