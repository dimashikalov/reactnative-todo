import {ITodo} from '../../screens/TodoList/TodoList.types';

export interface ITodoItemProps {
  ind: number;
  todo: ITodo;
  onCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  onPress: (id: number) => void;
}
