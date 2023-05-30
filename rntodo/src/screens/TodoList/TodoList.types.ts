import {Asset} from 'react-native-image-picker';
import {ITodoListNavigationProp} from '../../navigation/Navigation.types';

export interface ITodo {
  completed: boolean;
  id: number;
  title: string;
  imgs: Asset[];
}

export type ITodoListProps = {
  navigation: ITodoListNavigationProp;
};
