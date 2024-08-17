// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { loadingMiddleware } from './middlewares/loading.middleware.js';
import {persistedReducer} from './rootReducer';
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for persist
    }).concat(loadingMiddleware),
});

export const persistor = persistStore(store); // Export the persistor
export default store;
