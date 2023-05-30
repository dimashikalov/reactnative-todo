import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoList from '../screens/TodoList/TodoList';
import {IRootStackParams} from './Navigation.types';
import {TodoDetails} from '../screens/TodoDetails/TodoDetails';
import BackButton from '../components/BackButton/BackButton';

const RootStack = createNativeStackNavigator<IRootStackParams>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="TodoList">
        <RootStack.Screen name="TodoList" component={TodoList} />
        <RootStack.Screen
          options={({navigation}) => ({
            title: 'Details',
            headerTitleStyle: {fontSize: 25},
            headerTitleAlign: 'center',
            headerTintColor: 'green',
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
          name="TodoDetails"
          component={TodoDetails}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
