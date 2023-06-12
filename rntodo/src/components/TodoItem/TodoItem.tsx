import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ITodoItemProps} from './TodoItem.types';
import {styles} from './TodoItem.styles';
import Checkbox from '../Checkbox/Checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {LightSpeedInLeft} from 'react-native-reanimated';

export const TodoItem: FC<ITodoItemProps> = ({
  ind,
  todo,
  onCompleted,
  onDelete,
  onPress,
}) => {
  const handlePress = () => {
    onPress(todo.id);
  };
  const handleCompleted = () => {
    onCompleted(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id);
  };
  return (
    <Animated.View entering={LightSpeedInLeft} style={styles.todoRow}>
      <TouchableOpacity onPress={handlePress} style={styles.todoContainer}>
        <Checkbox checked={todo.completed} onPress={handleCompleted} />
        <Text style={styles.todoText}>
          {ind + 1}: {todo.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeletePress}>
        <Icon name="remove" size={30} color={'red'} />
      </TouchableOpacity>
    </Animated.View>
  );
};
