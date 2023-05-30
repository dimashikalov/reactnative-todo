import {combineReducers} from 'redux';
import {FETCH_STATUSES} from '../utils/constans';
import {
  GET_TODOS_ERROR,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  CHANGED_TODO,
  DELETED_TODO,
} from './actions';
import {ITodo} from '../screens/TodoList/TodoList.types';
import {
  IAction,
  IGetTodosSuccessAction,
  ITodosState,
  IDeleteTodoAction,
  IChangedTodoAction,
} from './types';

const initialState: ITodosState = {
  todos: {},
  status: FETCH_STATUSES.idle,
};

const todosReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TODOS_REQUEST: {
      return {
        ...state,
        status: FETCH_STATUSES.request,
      };
    }
    case GET_TODOS_SUCCESS: {
      return {
        ...state,
        status: FETCH_STATUSES.success,
        todos: (action as IGetTodosSuccessAction).payload,
      };
    }
    case GET_TODOS_ERROR: {
      return {
        ...state,
        status: FETCH_STATUSES.error,
      };
    }
    case CHANGED_TODO: {
      const typedAction = action as IChangedTodoAction;
      return {
        ...state,
        todos: {
          ...state.todos,
          [typedAction.payload.id]: typedAction.payload,
        },
      };
    }
    case DELETED_TODO: {
      const typedAction = action as IDeleteTodoAction;
      const todos = {...state.todos};
      delete todos[typedAction.payload];

      return {
        ...state,
        todos,
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
// export const rootReducer = combineReducers({
//   todos: todosReducer,
// });
