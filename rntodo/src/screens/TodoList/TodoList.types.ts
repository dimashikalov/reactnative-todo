import {ITodoListNavigationProp} from '../../navigation/Navigation.types';

export interface ITodo {
  completed: boolean;
  id: number;
  title: string;
}

export type ITodoListProps = {
  navigation: ITodoListNavigationProp;
};
