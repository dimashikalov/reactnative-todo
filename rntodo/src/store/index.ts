import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import rootReducer from './reducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {IAction, ITodosState} from './types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<ITodosState, IAction>(
  persistConfig,
  rootReducer,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
