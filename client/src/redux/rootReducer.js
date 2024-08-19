// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import permissionReducer from './features/permission/permission.slice';
import roleReducer from './features/role/role.slice';
import loadingReducer from './features/loading/loading.slice';
import modalReducer from './features/modal/modal.slice';

// Create a persist config
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['permission'], // Only persist templateCard
};

// Combine reducers
const rootReducer = combineReducers({
  permission: permissionReducer,
  role: roleReducer,
  loading: loadingReducer,
  modal : modalReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer };
