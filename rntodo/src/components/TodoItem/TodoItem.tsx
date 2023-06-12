import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ITodoItemProps} from './TodoItem.types';
import {styles} from './TodoItem.styles';
import Checkbox from '../Checkbox/Checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {
  LightSpeedInLeft,
  useSharedValue,
  useAnimatedStyle,
  FlipOutYRight,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const MAX_OFFSET = -100;

export const TodoItem: FC<ITodoItemProps> = ({
  ind,
  todo,
  onCompleted,
  onDelete,
  onPress,
}) => {
  const offset = useSharedValue(0);
  const start = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const handlePress = () => {
    onPress(todo.id);
  };
  const handleCompleted = () => {
    onCompleted(todo.id);
  };

  const handleDeletePress = () => {
    onDelete(todo.id);
  };

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        e.translationX < -start.value &&
        e.translationX > MAX_OFFSET - start.value
      ) {
        offset.value = e.translationX + start.value;
      }
    })
    .onEnd(e => {
      if (e.translationX < MAX_OFFSET / 2) {
        start.value = offset.value;
      }
      if (e.translationX > MAX_OFFSET / 2) {
        offset.value = 0;
      }
    });

  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{scale: offset.value / MAX_OFFSET}],
  }));

  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(600)}
      exiting={FlipOutYRight.duration(500)}
      style={[styles.todoRow, style]}>
      <GestureDetector gesture={gesture}>
        <TouchableOpacity onPress={handlePress} style={styles.todoContainer}>
          <Checkbox checked={todo.completed} onPress={handleCompleted} />
          <Text style={styles.todoText}>
            {ind + 1}: {todo.title}
          </Text>
        </TouchableOpacity>
      </GestureDetector>
      <Animated.View style={deleteStyle}>
        <TouchableOpacity onPress={handleDeletePress}>
          <Icon name="remove" size={30} color={'red'} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
