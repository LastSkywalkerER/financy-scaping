import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import dataTableReducer from './dataTableSlice';
import savedTickersReducer from './savedTickersSlice';
import userMessageReducer from './userMessageSlice';
import sagas from '@core/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    themeName: themeReducer,
    auth: authReducer,
    dataTable: dataTableReducer,
    savedTickers: savedTickersReducer,
    userMessage: userMessageReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(sagas);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
