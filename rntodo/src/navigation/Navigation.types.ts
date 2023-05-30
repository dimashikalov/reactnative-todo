import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type IRootStackParams = {
  TodoList: undefined;
  TodoDetails: {
    todoId: number;
  };
};

export type ITodoListNavigationProp = NativeStackNavigationProp<
  IRootStackParams,
  'TodoList'
>;

export type ITodoDetailsRouteProp = RouteProp<IRootStackParams, 'TodoDetails'>;
export type ITodoDetailsNavigationProp = NativeStackNavigationProp<
  IRootStackParams,
  'TodoDetails'
>;
