import {ITodosState} from './types';

export const selectTodos = (state: ITodosState) => state.todos;
export const selectTodoById = (id: number) => (state: ITodosState) =>
  state.todos[id];
