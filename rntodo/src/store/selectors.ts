import {ITodosState} from './types';

export const selectTodos = (state: ITodosState) => state.todos;
