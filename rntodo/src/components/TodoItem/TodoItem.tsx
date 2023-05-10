import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ITodoItemProps} from './TodoItem.types';
import {styles} from './TodoItem.styles';
import Checkbox from '../Checkbox/Checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TodoItem: FC<ITodoItemProps> = ({
  ind,
  todo,
  onCompleted,
  onDelete,
}) => {
  const handlePress = () => {
    onCompleted(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id);
  };
  return (
    <View style={styles.todoRow}>
      <TouchableOpacity onPress={handlePress} style={styles.todoContainer}>
        <Checkbox checked={todo.completed} />
        <Text style={styles.todoText}>
          {ind + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeletePress}>
        <Icon name="remove" size={30} color={'red'} />
      </TouchableOpacity>
    </View>
  );
};
